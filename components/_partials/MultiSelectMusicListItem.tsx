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
  interpolate,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import convertToNormalTimestamp from "../../utils/convertToNormalTimestamp";
import { Asset } from "expo-media-library";
import Checkbox from "./Checkbox";
const ITEM_HEIGHT = 25;

interface MultiSelectMusicListItemProps {
  item: Asset;
  onItemPress: (item: Asset, index: number) => void;
  index: number;
  showItemOption?: boolean;
}

const MultiSelectMusicListItem = memo(
  ({
    item,
    onItemPress,
    index,
    showItemOption,
  }: MultiSelectMusicListItemProps) => {
    const [checked, setChecked] = useState(false);
    const onAudioItemPress = () => {
      setChecked((v) => !v);
      onItemPress(item, index);
    };

    return (
      <TouchableWithoutFeedback onPress={onAudioItemPress}>
        <View style={[styles.wrapper]}>
          <Checkbox checked={checked} />
          <Text style={[styles.audioItemTitle]} numberOfLines={1}>
            {item.filename}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    height: ITEM_HEIGHT,
    marginBottom: 2,
    gap: 5,
    alignItems: "center",
  },
  audioItemTitle: {
    fontSize: 15,
    fontWeight: "bold",
    width: "100%",
  },
});

export default MultiSelectMusicListItem;
