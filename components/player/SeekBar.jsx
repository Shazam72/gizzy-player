import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import PlayerContext from "../../contexts/player";
import Slider from "@react-native-community/slider";
import color from "../../configs/color";


export default function SeekBar({ value }) {
  return (
    <View style={styles.wrapper}>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={0}
        maximumValue={1}
        value={value}
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
});
