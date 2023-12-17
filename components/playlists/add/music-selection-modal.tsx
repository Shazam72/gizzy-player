import { StyleSheet, Text, View, Dimensions, StatusBar } from "react-native";
import React, { useContext } from "react";
import MediaContext, { useMediaContext } from "../../../contexts/media";
import MultiSelectMusicList from "../../_partials/MultiSelectMusicList";
import { Asset } from "expo-media-library";
import { PlaylistContext } from "../../../contexts/playlist";

const { height: SCREEN_HEIGHT } = Dimensions.get("screen");

const MusicSelectionModal = () => {
  const { mediaInfo } = useMediaContext();
  const { addingList, addAudioToAddingList, removeAudioFromAddingList } = useContext(PlaylistContext);

  const toogleAudio = (item: Asset, index: number) => {
    const isInList = addingList.find((v) => v == item.id);

    if (isInList) {
      removeAudioFromAddingList(item.id);
    } else addAudioToAddingList(item.id);
  };

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Select music(s)</Text>
      </View>
      <View style={{ marginVertical: 20 }}>
        <MultiSelectMusicList
          list={[
            mediaInfo.audioList[0],
            mediaInfo.audioList[1],
            mediaInfo.audioList[2],
            mediaInfo.audioList[3],
            mediaInfo.audioList[4],
            mediaInfo.audioList[5],
            mediaInfo.audioList[6],
            mediaInfo.audioList[7],
          ]}
          onItemPress={toogleAudio}
        />
      </View>
    </View>
  );
};

export default MusicSelectionModal;

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
  },
  titleContainer: {
    borderBottomWidth: 2,
    borderBottomColor: "lightgray",
    paddingVertical: 5,
  },
});
