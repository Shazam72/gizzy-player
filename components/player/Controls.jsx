import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useMemo } from "react";
import { AntDesign } from "@expo/vector-icons";
import MediaContext from "../../contexts/media";
import {} from "react/cjs/react.production.min";

export default function Controls() {
  const { playerInfo } = useContext(MediaContext);

  const playPauseIcon = useMemo(() => {
    return playerInfo.playerStatus && playerInfo.playerStatus.isPlaying
      ? "pausecircle"
      : "playcircleo";
  }, [playerInfo.playerStatus]);

  return (
    <View style={styles.wrapper}>
      <AntDesign name="banckward" size={35} />
      <AntDesign name={playPauseIcon} size={60} />
      <AntDesign name="forward" size={35} />
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
