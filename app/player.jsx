import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import Title from "../components/player/Title";
import Controls from "../components/player/Controls";
import Viewer from "../components/player/Viewer";
import SeekBar from "../components/player/SeekBar";
import PlayerContext from "../contexts/player";
import MediaContext from "../contexts/media";
import { playAnotherAudio } from "../utils/audio-control";
import { usePlayerControls } from "../hooks/player-controls";

const getSeekBarValue = (positionMillis, durationMillis) => {
  if (durationMillis && positionMillis) return positionMillis / durationMillis;

  return 0;
};

export default function Player() {
  const { playerInfo } = useContext(PlayerContext);
  const { mediaInfo } = useContext(MediaContext);
  const { next } = usePlayerControls();
  const [seekBarValue, setSeekBarValue] = useState(0);

  const onPlaybackStatusUpdate = async (currentPlayerStatus) => {
    if (currentPlayerStatus.isLoaded && currentPlayerStatus.isPlaying) {
      setSeekBarValue(
        getSeekBarValue(
          currentPlayerStatus.positionMillis,
          currentPlayerStatus.durationMillis
        )
      );
    }

    if (currentPlayerStatus.didJustFinish) {
      await next();
    }
  };

  useEffect(() => {
    if (playerInfo.playerStatus) {
      playerInfo.playerObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    }
    return () => {
      playerInfo.playerObj.setOnPlaybackStatusUpdate(() => {});
    };
  }, [playerInfo.playerStatus]);

  return (
    <View style={[styles.wrapper]}>
      <Viewer />
      <Title>
        {playerInfo?.currentAudio?.filename ??
          "Titre non defini un bon son aj sjsjjsjjs jsjjdjdjdjdjd djdjjddjjd"}
      </Title>
      <SeekBar value={seekBarValue} />
      <Controls />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // justifyContent: "center",
  },
});
