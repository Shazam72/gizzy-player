import { StyleSheet, Text, View } from "react-native";
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import PlayerContext from "../../contexts/player";
import Slider from "@react-native-community/slider";
import color from "../../configs/color";
import { useMediaContext } from "../../contexts/media";
import {  playAudio } from "../../utils/audio-control";
import convertToNormalTimestamp from "../../utils/convertToNormalTimestamp";

const getSeekBarValue = (positionMillis, durationMillis) => {
  if (durationMillis && positionMillis) return positionMillis / durationMillis;

  return 0;
};

export default function SeekBar({ showDuration = true }) {
  const { playerInfo, updatePlayerInfo } = useContext(PlayerContext);
  const { mediaInfo, getAudioIndexByURI } = useMediaContext();
  const [seekbarValue, setSeekbarValue] = useState(0);
  const currentDuration = useRef(0);
  const testSeekBarValue = useRef(0);

  const audioDuration = useMemo(
    () => convertToNormalTimestamp(playerInfo.currentAudio?.duration),
    [playerInfo.currentAudio]
  );

  const onPlaybackStatusUpdate = useCallback(
    async (newPlaybackStatus) => {
      if (newPlaybackStatus.isLoaded && newPlaybackStatus.isPlaying) {
        currentDuration.current = newPlaybackStatus.positionMillis / 1000;
        testSeekBarValue.current = getSeekBarValue(
          newPlaybackStatus.positionMillis,
          newPlaybackStatus.durationMillis
        );
        setSeekbarValue(
          getSeekBarValue(
            newPlaybackStatus.positionMillis,
            newPlaybackStatus.durationMillis
          )
        );
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
        const newCurrentAudio = mediaInfo.audioList[newCurrentAudioIndex];
        const status = await playAudio(
          playerInfo.playerObj,
          newCurrentAudio.uri
        );

        updatePlayerInfo({
          playerStatus: status,
          currentAudioIndex: newCurrentAudioIndex,
          currentAudio: newCurrentAudio,
        });
      }
    },
    [mediaInfo.audioList]
  );

  useEffect(() => {
    playerInfo.playerObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
  }, []);

  return (
    <View style={styles.wrapper}>
      {showDuration && (
        <View style={styles.durationContainer}>
          <Text style={styles.durationText}>
            {convertToNormalTimestamp(currentDuration.current)}
          </Text>
          <Text style={styles.durationText}>{audioDuration}</Text>
        </View>
      )}
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={0}
        maximumValue={1}
        value={seekbarValue}
        minimumTrackTintColor={color.primary}
        maximumTrackTintColor={color.base}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
  },
  durationContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  durationText: {
    fontWeight: "500",
  },
});
