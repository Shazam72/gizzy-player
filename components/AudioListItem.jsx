import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { useCallback, memo, useContext } from "react";
import { Entypo } from "@expo/vector-icons";
import color from "../configs/color";
import MediaContext from "../contexts/media";
import {
  pauseAudio,
  playAnotherAudio,
  playAudio,
  resumeAudio,
} from "../utils/audio-control";
import { useNavigation } from "expo-router";
import PlayerContext from "../contexts/player";

const AudioListItem = memo(({ item, onOptionPress, index }) => {
  // const onAudioOptionPress = () => onOptionPress(item);
  const { playerInfo, updatePlayerInfo } = useContext(PlayerContext);
  const navigation = useNavigation();

  const onAudioListItemPress = useCallback(async () => {
    const { currentAudio, playerStatus, playerObj } = playerInfo;

    if (playerStatus === null) {
      const status = await playAudio(playerObj, item.uri);

      updatePlayerInfo({
        currentAudio: item,
        playerStatus: status,
        currentAudioIndex: index,
      });
      return navigation.navigate("player");
    }
    if (currentAudio.id === item.id) {
      let status = null;
      if (!playerStatus.isPlaying && playerStatus.isLoaded)
        status = await resumeAudio(playerObj);

      if (playerStatus.isPlaying && playerStatus.isLoaded)
        status = await pauseAudio(playerObj);

      return updatePlayerInfo({ playerStatus: status });
    } else {
      let status = await playAnotherAudio(playerObj, item.uri);
      updatePlayerInfo({
        currentAudio: item,
        playerStatus: status,
        currentAudioIndex: index,
      });
      return navigation.navigate("player");
    }
  }, []);
  return (
    <View style={[styles.wrapper]}>
      <TouchableWithoutFeedback onPress={onAudioListItemPress}>
        <View style={styles.audioItemContainer}>
          <View style={styles.audioItemInfoContainer}>
            <Text style={[styles.audioItemTitle]} numberOfLines={1}>
              {item.filename}
            </Text>
            <Text style={[styles.audioItemSubTitle]}>{item.duration}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={styles.audioItemDots}>
          <Entypo name="dots-three-vertical" color="#959595" size={24} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
  },
  audioItemContainer: {
    flexDirection: "row",
    columnGap: 7,
    flex: 1,
  },
  audioItemTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  audioItemInfoContainer: {
    paddingVertical: 5,
    justifyContent: "space-between",
    flex: 1,
  },
  audioItemSubTitle: {
    color: "#a5a5a5",
  },
  audioItemDots: {
    // borderWidth: 2,
    justifyContent: "center",
    paddingRight: 10,
  },
});

export default AudioListItem;
