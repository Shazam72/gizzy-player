import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { useCallback, memo } from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Entypo } from "@expo/vector-icons";
import color from "../configs/color";

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    position: "relative",
    justifyContent: "space-between",
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
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
    width: "80%",
  },
  audioItemSubTitle: {
    color: "#a5a5a5",
  },
  audioItemDots: {
    // borderWidth: 2,
    justifyContent: "center",
    paddingRight: 10,
  },
  activeItem: {
    backgroundColor: "#d406d479",
  },
  activeItemText: {
    color: color.white,
  },
});

const AudioItem = ({
  item,
  onOptionPress,
  viewableItems,
  onAudioItemPress,
  index,
  isCurrent,
  icon,
}) => {
  const onAudioOptionPress = (() => onOptionPress(item));
  const onAudioPress = async () => await onAudioItemPress(item, index);
  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter((v) => v.isViewable)
        .find((v) => v.item.id === item.id)
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

  return (
    <Animated.View
      style={[styles.wrapper, rStyle, isCurrent ? styles.activeItem : {}]}
    >
      <TouchableWithoutFeedback onPress={onAudioPress}>
        <View style={styles.audioItemContainer}>
          {icon}
          <View style={styles.audioItemInfoContainer}>
            <Text
              style={[
                styles.audioItemTitle,
                isCurrent ? styles.activeItemText : {},
              ]}
              numberOfLines={1}
            >
              {item.filename}
            </Text>
            <Text
              style={[
                styles.audioItemSubTitle,
                isCurrent ? styles.activeItemText : {},
              ]}
            >
              {item.duration}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onAudioOptionPress}>
        <View style={styles.audioItemDots}>
          <Entypo
            name="dots-three-vertical"
            color={isCurrent ? "white" : "#959595"}
            size={24}
          />
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

export default memo(AudioItem);
