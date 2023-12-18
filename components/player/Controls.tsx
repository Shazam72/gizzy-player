import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useMemo, useState, useRef } from "react";
import { AntDesign } from "@expo/vector-icons";
import { usePlayerControls } from "../../hooks/player-controls";
import PlayerContext from "../../contexts/player";

export default function Controls() {
  const { playerInfo } = useContext(PlayerContext);
  const { playPause, next, prev } = usePlayerControls();

  const playPauseIcon = useMemo(() => {
    return playerInfo.playerStatus && playerInfo.playerStatus.isPlaying
      ? "pausecircle"
      : "playcircleo";
  }, [playerInfo.playerStatus]);

  return (
    <View style={styles.wrapper}>
      <AntDesign name="stepbackward" size={35} onPress={prev} />
      <AntDesign name="banckward" size={35} />
      <AntDesign
        name={playPauseIcon}
        onPress={playPause}
        size={60}
      />
      <AntDesign name="forward" size={35} />
      <AntDesign name="stepforward" onPress={next} size={35} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    flexDirection: "row",
    gap: 30,
    paddingVertical: 10,
    justifyContent: "center",
  },
});
