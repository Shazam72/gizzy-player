import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import PlayerContext from "../../contexts/player";
import Slider from "@react-native-community/slider";
import color from "../../configs/color";

const getSeekBarValue = (positionMillis, durationMillis) => {
  if (durationMillis && positionMillis)
    return positionMillis / durationMillis;

  return 0;
};

export default function SeekBar() {
  const { playerInfo } = useContext(PlayerContext);
  const [seekBarValue, setSeekBarValue] = useState(0);

  // console.log(seekBarValue);

  useEffect(() => {
    let intervalID = setInterval(async () => {
      if (
        playerInfo.playerStatus.isLoaded &&
        playerInfo.playerStatus.isPlaying
      ) {
        let currentPlayerStatus = await playerInfo.playerObj.getStatusAsync();
        setSeekBarValue(
          getSeekBarValue(
            currentPlayerStatus.positionMillis,
            currentPlayerStatus.durationMillis
          )
        );
      }
    }, 100);

    return () => {
      clearInterval(intervalID);
    };
  }, [playerInfo.playerStatus]);

  return (
    <View style={styles.wrapper}>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={0}
        maximumValue={1}
        value={seekBarValue}
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
