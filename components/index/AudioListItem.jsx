import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { memo } from "react";
import color from "../../configs/color";
import { Entypo, SimpleLineIcons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const AudioListItem = memo(
  ({ item, onOptionPress, viewableItems, index, onAudioListItemPress }) => {
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
    const onAudioOptionPress = () => onOptionPress(item, index);
    const onAudioItemPress = () => onAudioListItemPress(item, index);

    return (
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
              <Text style={[styles.audioItemSubTitle]}>{item.duration}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={onAudioOptionPress}>
          <View style={styles.audioItemDots}>
            <Entypo name="dots-three-vertical" color="#959595" size={24} />
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
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
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AudioListItem;
