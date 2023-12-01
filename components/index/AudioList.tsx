import { FlatList, StyleSheet, View } from "react-native";
import React, { useCallback, useContext, useState } from "react";
import AudioListItem from "./AudioListItem";
import { pauseAudio, playAudio, resumeAudio } from "../../utils/audio-control";
import { Tabs, useNavigation, useRouter } from "expo-router";
import { useMediaContext } from "../../contexts/media";
import PlayerContext from "../../contexts/player";
import OptionModal from "./OptionModal";
import { AVPlaybackStatus, AVPlaybackStatusSuccess, Audio } from "expo-av";
import { Asset } from "expo-media-library";

const keyExtractor = (item) => item.id;

export type ModalFunctionsType = {
  onListeningOptionPress: (item: Asset, index: number) => void;
  addAsFavourite: (item: Asset, index: number) => void;
  addToPlaylist: (item: Asset, index: number) => void;
};

export type ModalOptionsType = (
  playerObj: Audio.Sound,
  callback: CallableFunction
) => ModalFunctionsType;

const useModalOptions: ModalOptionsType = (playerObj, callback) => {
  const router = useRouter();

  const onListeningOptionPress = async (item: Asset, index: number) => {
    let currentStatus = await playerObj.getStatusAsync();
    let status = null;

    status = await playAudio(playerObj, item.uri);
    callback({
      currentAudio: item,
      currentAudioIndex: index,
      playerStatus: status,
    });
  };
  const addAsFavourite = (item: Asset, index: number) => {};
  const addToPlaylist = (item: Asset, index: number) => {
    router.replace("playlists");
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
  const router = useRouter();
  const [modalData, setModalData] = useState<{
    visible: boolean;
    item: Asset;
    index: number;
  }>({
    visible: false,
    item: null,
    index: -1,
  });
  const modalOptionsFunctions = useModalOptions(playerObj, updatePlayerInfo);
  const onCloseModal = () =>
    setModalData((v) => ({ visible: !v.visible, index: null, item: null }));

  const onAudioOptionPress = useCallback(
    (item: Asset, index: number) =>
      setModalData((v) => ({ visible: !v.visible, item, index })),
    []
  );

  const onAudioListItemPress = useCallback(
    async (item: Asset, index: number) => {
      let currentStatus =
        (await playerObj.getStatusAsync()) as AVPlaybackStatusSuccess;
      let status = null;

      let currentAudioIndex = getAudioIndexByURI(currentStatus.uri, true);
      if (currentAudioIndex == index) {
        if (currentStatus?.isPlaying) status = await pauseAudio(playerObj);
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
      return router.replace("player");
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
        // index={modalData.index}
        // item={modalData.item}
        // visible={modalData.visible}
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
