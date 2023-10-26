import { FlatList, StyleSheet, Text, Dimensions, View } from "react-native";
import React, { useCallback, useContext } from "react";
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
  const { currentAudio, currentAudioIndex, playerObj, playerStatus } =
    playerInfo;
  const navigation = useNavigation();

  const onPlaybackStatusUpdate = useCallback(async (newPlaybackStatus) => {
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
      newCurrentAudioIndex++
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
  }, [mediaInfo.audioList]);
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

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <AudioListItem
          onAudioListItemPress={onAudioListItemPress}
          item={item}
          index={index}
        />
      );
    },
    [onAudioListItemPress]
  );

  return (
    <View style={styles.wrapper}>
      <FlatList
        style={styles.listContainer}
        data={list}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 10 }}
        getItemLayout={getItemLayout}
      />
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
