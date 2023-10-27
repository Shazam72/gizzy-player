import { FlatList, StyleSheet, View } from "react-native";
import React, { useCallback, useContext, useState } from "react";
import AudioListItem from "./AudioListItem";
import {
  pauseAudio,
  playAnotherAudio,
  playAudio,
  resumeAudio,
} from "../../utils/audio-control";
import { useNavigation } from "expo-router";
import MediaContext, { useMediaContext } from "../../contexts/media";
import PlayerContext from "../../contexts/player";
import OptionModal from "../OptionModal";
import { useSharedValue } from "react-native-reanimated";

const ITEM_HEIGHT = 65;
const getItemLayout = (data, index) => {
  return {
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  };
};
const keyExtractor = (item) => item.id;

export default function AudioList({ list }) {
  const { mediaInfo, getAudioIndexByURI } = useMediaContext();
  let { playerInfo, updatePlayerInfo, playbackStatus, updatePlaybackStatus } =
    useContext(PlayerContext);
  const { playerObj } = playerInfo;
  const navigation = useNavigation();
  const [modalData, setModalData] = useState({
    visible: false,
    item: false,
    index: -1,
  });
  const viItems = useSharedValue([]);

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    console.log(viewableItems.length);
    viItems.value = viewableItems.filter((v) => v.isViewable);
  }, []);

  const onCloseModal = () => setModalData((v) => ({ visible: !v.visible }));

  const onAudioOptionPress = useCallback(
    (item, index) =>
      setModalData((v) => ({ visible: !v.visible, item, index })),
    []
  );
  const onPlaybackStatusUpdate = useCallback(
    async (newPlaybackStatus) => {
      if (newPlaybackStatus.isLoaded && newPlaybackStatus.isPlaying) {
        updatePlaybackStatus(newPlaybackStatus);
      }
      if (newPlaybackStatus.didJustFinish) {
        let newCurrentAudioIndex = getAudioIndexByURI(
          newPlaybackStatus.uri,
          true
        );

        if (newCurrentAudioIndex == -1) {
          console.error("Audio index for", newPlaybackStatus.uri, "not found");
          return;
        }
        newCurrentAudioIndex++;
        if (newCurrentAudioIndex >= mediaInfo.totalCount)
          newCurrentAudioIndex = 0;
        let newCurrentAudio = mediaInfo.audioList[newCurrentAudioIndex];
        let status = await playAnotherAudio(playerObj, newCurrentAudio.uri);
        updatePlayerInfo({
          playerStatus: status,
          currentAudioIndex: newCurrentAudioIndex,
          currentAudio: newCurrentAudio,
        });
      }
    },
    [mediaInfo.audioList]
  );
  const onAudioListItemPress = useCallback(
    async (item, index) => {
      let currentStatus = await playerObj.getStatusAsync();
      let status = null;
      if (!currentStatus.isLoaded) {
        status = await playAudio(playerObj, item.uri);

        updatePlayerInfo({
          currentAudio: item,
          playerStatus: status,
          currentAudioIndex: index,
        });
        playerObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        return navigation.navigate("player");
      }

      let currentAudioIndex = getAudioIndexByURI(currentStatus.uri, true);
      if (currentAudioIndex == -1) {
        console.error("Audio index for", currentStatus.uri, "not found");
        return;
      }

      if (currentAudioIndex == index) {
        if (currentStatus.isPlaying) status = await pauseAudio(playerObj);
        else status = await resumeAudio(playerObj);

        return updatePlayerInfo({
          playerStatus: status,
        });
      }

      status = await playAnotherAudio(playerObj, item.uri);
      updatePlayerInfo({
        currentAudio: item,
        currentAudioIndex: index,
        playerStatus: status,
      });
      return navigation.navigate("player");
    },
    [onPlaybackStatusUpdate, getAudioIndexByURI]
  );

  const renderItem = ({ item, index }) => {
    return (
      <AudioListItem
        onAudioListItemPress={onAudioListItemPress}
        onOptionPress={onAudioOptionPress}
        item={item}
        viewableItems={viItems}
        index={index}
      />
    );
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        style={styles.listContainer}
        data={list}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 10 }}
        getItemLayout={getItemLayout}
        onViewableItemsChanged={onViewableItemsChanged}
      />
      <OptionModal onClose={onCloseModal} {...modalData} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    // flex:1,
  },
  listContainer: {
    paddingLeft: 10,
    paddingVertical: 10,
  },
  activeItem: {
    backgroundColor: "#d406d479",
  },
});
