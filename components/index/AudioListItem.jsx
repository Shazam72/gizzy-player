import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { useCallback, memo, useContext, useState } from "react";
import color from "../../configs/color";
import MediaContext from "../../contexts/media";
import {
  pauseAudio,
  playAnotherAudio,
  playAudio,
  resumeAudio,
} from "../../utils/audio-control";
import { useNavigation } from "expo-router";
import PlayerContext from "../../contexts/player";
import { Entypo, SimpleLineIcons } from "@expo/vector-icons";

const AudioListItem = memo(
  ({ item, onOptionPress, index, onAudioListItemPress }) => {
    console.log("item rendered ", index);
    // const onAudioOptionPress = () => onOptionPress(item);
    const onAudioItemPress = () => onAudioListItemPress(item, index);
    return (
      <View style={[styles.wrapper]}>
        <TouchableWithoutFeedback onPress={onAudioItemPress}>
          <View style={styles.audioItemContainer}>
            <View style={styles.iconContainer}>
              <SimpleLineIcons
                color={color.primary}
                size={30}
                name="music-tone"
              />
            </View>
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
  }
);

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
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: color.lightGray,
    justifyContent:"center",
    alignItems:"center"
  },
});

export default AudioListItem;
