import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useMemo, useRef } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PlayerContext from "../../contexts/player";
import { useMediaContext } from "../../contexts/media";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { playAudio } from "../../utils/audio-control";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const ITEM_SIZE = SCREEN_WIDTH;

export default function Viewer() {
  const { mediaInfo } = useMediaContext();
  const { playerInfo, updatePlayerInfo } = useContext(PlayerContext);
  const scrollX = useSharedValue(0);

  const itemsList = useMemo(() => {
    let itemsList = [-1];
    if (playerInfo.currentAudioIndex == -1) return itemsList;

    itemsList.pop();
    const prevAudioIndex = playerInfo.currentAudioIndex - 1;
    if (prevAudioIndex >= 0) itemsList.push(prevAudioIndex);
    itemsList.push(playerInfo.currentAudioIndex);
    const nextAudioIndex = playerInfo.currentAudioIndex + 1;
    if (nextAudioIndex <= mediaInfo.totalCount) itemsList.push(nextAudioIndex);
    return itemsList;
  }, [playerInfo.currentAudioIndex]);

  const initialScrollIndex = useMemo(() => {
    if (playerInfo.currentAudioIndex == -1) return null;
    if (playerInfo.currentAudioIndex == 0) return 0;
    return 1;
  }, [playerInfo.currentAudioIndex]);

  const onScroll = useAnimatedScrollHandler((evt) => {
    let audioIndex = evt.contentOffset.x / ITEM_SIZE;
    try {
      console.log(itemsList[audioIndex]);
    } catch (error) {}
  });

  return (
    <Animated.FlatList
      contentContainerStyle={styles.wrapper}
      horizontal
      onMomentumScrollEnd={(evt) => {
        let audioIndex = evt.nativeEvent.contentOffset.x / ITEM_SIZE;

        if (typeof audioIndex == "number") {
          console.log(audioIndex);
          let audio = mediaInfo.audioList[audioIndex];
          playAudio(playerInfo.playerObj, audio.uri).then((status) => {
            updatePlayerInfo({
              playerStatus: status,
              currentAudioIndex: audioIndex,
              currentAudio: audio,
            });
          });
        }
      }}
      data={itemsList}
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      getItemLayout={(data, index) => ({
        length: ITEM_SIZE,
        offset: ITEM_SIZE * index,
        index,
      })}
      initialScrollIndex={initialScrollIndex}
      renderItem={() => (
        <View style={[styles.audioScrollItem]}>
          <MaterialCommunityIcons
            style={styles.musicCircle}
            name="music-circle"
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "red",
    // borderWidth: 2,
  },
  musicCircle: {
    fontSize: ITEM_SIZE,
    color: "gray",
  },
  audioScrollItem: { width: ITEM_SIZE },
});
