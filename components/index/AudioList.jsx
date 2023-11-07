import { FlatList, StyleSheet, View } from "react-native";
import React, { useCallback, useContext, useState } from "react";
import AudioListItem from "./AudioListItem";
import { pauseAudio, playAudio, resumeAudio } from "../../utils/audio-control";
import { Tabs, useNavigation } from "expo-router";
import { useMediaContext } from "../../contexts/media";
import PlayerContext from "../../contexts/player";
import OptionModal from "../OptionModal";

const keyExtractor = (item) => item.id;

const useModalOptions = (playerObj, callback) => {
  const navigation = useNavigation();

  const onListeningOptionPress = async (item, index) => {
    let currentStatus = await playerObj.getStatusAsync();
    let status = null;

    status = await playAudio(playerObj, item.uri);
    callback({
      currentAudio: item,
      currentAudioIndex: index,
      playerStatus: status,
    });
  };
  const addAsFavourite = (item, index) => {};
  const addToPlaylist = (item, index) => {
    navigation.navigate("playlists");
  };

  return {
    onListeningOptionPress,
    addAsFavourite,
    addToPlaylist,
  };
};

export default function AudioList({ list }) {
  const { getAudioIndexByURI } = useMediaContext();
  let { playerInfo, updatePlayerInfo } = useContext(PlayerContext);
  const { playerObj } = playerInfo;
  const navigation = useNavigation();
  const [modalData, setModalData] = useState({
    visible: false,
    item: false,
    index: -1,
  });
  const modalOptionsFunctions = useModalOptions(playerObj, updatePlayerInfo);
  console.log();
  const onCloseModal = () => setModalData((v) => ({ visible: !v.visible }));

  const onAudioOptionPress = useCallback(
    (item, index) =>
      setModalData((v) => ({ visible: !v.visible, item, index })),
    []
  );

  const onAudioListItemPress = useCallback(
    async (item, index) => {
      let currentStatus = await playerObj.getStatusAsync();
      let status = null;

      let currentAudioIndex = getAudioIndexByURI(currentStatus.uri, true);
      if (currentAudioIndex == index) {
        if (currentStatus.isPlaying) status = await pauseAudio(playerObj);
        else status = await resumeAudio(playerObj);

        return updatePlayerInfo({
          playerStatus: status,
        });
      }

      status = await playAudio(playerObj, item.uri);
      updatePlayerInfo({
        currentAudio: item,
        currentAudioIndex: index,
        playerStatus: status,
      });
      return navigation.navigate("player");
    },
    [getAudioIndexByURI]
  );

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <AudioListItem
          onAudioListItemPress={onAudioListItemPress}
          onOptionPress={onAudioOptionPress}
          item={item}
          index={index}
        />
      );
    },
    [onAudioListItemPress]
  );

  return (
    <>
      <Tabs.Screen options={{ headerShown: true }} />
      <View>
        <FlatList
          style={styles.listContainer}
          data={list}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </View>
      <OptionModal
        onClose={onCloseModal}
        {...modalData}
        modalOptionsFunctions={modalOptionsFunctions}
      />
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    // borderWidth:2,
    // borderColor:"red",
    // flex:1
  },
  listContainer: {
    paddingLeft: 10,
    paddingVertical: 10,
  },
  activeItem: {
    backgroundColor: "#d406d479",
  },
});
