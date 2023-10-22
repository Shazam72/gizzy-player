import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Title from "../components/player/Title";
import Controls from "../components/player/Controls";
import Viewer from "../components/player/Viewer";
import SeekBar from "../components/player/SeekBar";

export default function Player() {
  return (
    <View style={[styles.wrapper]}>
      <Viewer />
      <Title />
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
