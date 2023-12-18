import { StyleSheet, Text, View, Dimensions, StatusBar } from "react-native";
import React, { useCallback, useContext, useMemo } from "react";
import MediaContext, { useMediaContext } from "../../../contexts/media";
import MultiSelectMusicList from "../../_partials/MultiSelectMusicList";
import { Asset } from "expo-media-library";
import { PlaylistContext } from "../../../contexts/playlist";

const { height: SCREEN_HEIGHT } = Dimensions.get("screen");

const MusicSelectionModal = () => {
  const { mediaInfo } = useMediaContext();
  const { addingList, addAudioToAddingList } =
    useContext(PlaylistContext);
  const selecteds = useMemo(() => addingList.map((v) => v.id), [addingList]);

  const toogleAudio = useCallback(
    (item: Asset, index: number) => addAudioToAddingList(item),
    []
  );

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Select music(s)</Text>
      </View>
      <MultiSelectMusicList
        list={mediaInfo.audioList}
        onItemPress={toogleAudio}
        selecteds={selecteds}
      />
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
