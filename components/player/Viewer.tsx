import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, {
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  const flatRef = useRef<FlatList>(null);

  const itemsList = useMemo(
    () => mediaInfo.audioList.map((v, index) => index),
    [mediaInfo.audioList]
  );

  useEffect(() => {
    if (playerInfo.currentAudioIndex != -1)
      flatRef.current?.scrollToIndex({
        index: playerInfo.currentAudioIndex,
        animated: false,
      });
  }, [playerInfo.currentAudioIndex]);

  const onScrollEndDrag = useCallback(
    async (evt: NativeSyntheticEvent<NativeScrollEvent>) => {
      let audioScrollIndex = Math.round(
        evt.nativeEvent.contentOffset.x / ITEM_SIZE
      );
      let shouldPlayNewSong = false;
      let velocity = evt.nativeEvent.velocity.x;

      let audioIndex = itemsList[audioScrollIndex];
      
      if (!audioIndex) return;

      if (Math.abs(velocity) >= 0.5) {
        shouldPlayNewSong = true;

        if (velocity < 0) {
          audioIndex++;
        } else {
          audioIndex--;
        }
      } else if (audioIndex != playerInfo.currentAudioIndex) {
        shouldPlayNewSong = true;
      }
      if (shouldPlayNewSong) {
        let audio = mediaInfo.audioList[audioIndex];
        if (!audio) return;
        
        try {
          let status = await playAudio(playerInfo.playerObj, audio.uri);
          updatePlayerInfo({
            playerStatus: status,
            currentAudioIndex: audioIndex,
            currentAudio: audio,
          });
        } catch (error) {
          console.error(error);
        }
      }
    },
    [playerInfo.currentAudioIndex, itemsList, mediaInfo.audioList]
  );
  return (
    <FlatList
      ref={flatRef}
      contentContainerStyle={styles.wrapper}
      horizontal
      onScrollEndDrag={onScrollEndDrag}
      data={itemsList}
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      getItemLayout={(data, index) => ({
        length: ITEM_SIZE,
        offset: ITEM_SIZE * index,
        index,
      })}
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
