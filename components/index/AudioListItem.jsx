import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { memo, useState } from "react";
import color from "../../configs/color";
import { Entypo, SimpleLineIcons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import convertToNormalTimestamp from "../../utils/convertToNormalTimestamp";
import OptionModal from "../OptionModal";

const AudioListItem = memo(
  ({ item, onAudioListItemPress, viewableItems, index, onOptionPress }) => {
    const rStyle = useAnimatedStyle(() => {
      const isVisible = Boolean(
        viewableItems.value.find((v) => v.item.id === item.id)
      );

      return {
        opacity: withTiming(isVisible ? 1 : 0),
        transform: [
          {
            scale: withTiming(isVisible ? 1 : 0.6),
          },
        ],
      };
    }, [viewableItems, item]);
    const onAudioItemPress = () => onAudioListItemPress(item, index);
    const onAudioOptionPress = () => onOptionPress(item, index);

    return (
      <>
        <Animated.View style={[styles.wrapper, rStyle]}>
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
                <Text style={[styles.audioItemSubTitle]}>
                  {convertToNormalTimestamp(item.duration)}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableOpacity style={styles.audioItemDots} onPress={onAudioOptionPress}>
            <Entypo name="dots-three-vertical" color="#959595" size={16} />
          </TouchableOpacity>
        </Animated.View>
      </>
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
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth:2,
    borderRadius: 35 / 2,
    // borderColor:"red"
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: color.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AudioListItem;
