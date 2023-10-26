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


export default function Player() {
  const { playerInfo } = useContext(PlayerContext);
  const { mediaInfo } = useContext(MediaContext);
  const { next } = usePlayerControls();

  return (
    <View style={[styles.wrapper]}>
      <Viewer />
      <Title>
        {playerInfo?.currentAudio?.filename ??
          "Titre non defini un bon son aj sjsjjsjjs jsjjdjdjdjdjd djdjjddjjd"}
      </Title>
      <SeekBar />
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
