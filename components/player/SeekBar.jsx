import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useRef, useState, useMemo } from "react";
import PlayerContext from "../../contexts/player";
import Slider from "@react-native-community/slider";
import color from "../../configs/color";

const getSeekBarValue = (positionMillis, durationMillis) => {
  if (durationMillis && positionMillis) return positionMillis / durationMillis;

  return 0;
};

export default function SeekBar() {
  const { playbackStatus } = useContext(PlayerContext);

  return (
    <View style={styles.wrapper}>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={0}
        maximumValue={1}
        value={getSeekBarValue(
          playbackStatus.positionMillis,
          playbackStatus.durationMillis
        )}
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
