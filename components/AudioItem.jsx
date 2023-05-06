import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useCallback } from "react";
import { Entypo, SimpleLineIcons } from "@expo/vector-icons";
import colors from "../configs/color";

const AudioItem = ({ item, onOptionPress }) => {
  const onAudioOptionPress = useCallback(() => onOptionPress(item));

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.audioItemContainer}>
        <View style={styles.audioItemImage}>
          <SimpleLineIcons name="music-tone" size={30} color="black" />
        </View>
        <View style={styles.audioItemInfoContainer}>
          <Text style={styles.audioItemTitle} numberOfLines={1}>
            {item.filename}
          </Text>
          <Text style={styles.audioItemSubTitle}>{item.duration}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.audioItemDots}
        onPress={onAudioOptionPress}
      >
        <Entypo name="dots-three-vertical" color="#959595" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default AudioItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    position: "relative",
    justifyContent: "space-between",
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
  audioItemImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#d5d5d5",
    borderWidth: 2,
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
});
