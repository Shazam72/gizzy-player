import { StyleSheet, View, FlatList, Dimensions, Animated } from "react-native";
import { useState, useCallback, useContext, useRef } from "react";
import MediaContext from "../contexts/media";
import {
  Entypo,
  SimpleLineIcons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";
import color from "../configs/color";
import AudioListItem from "../components/AudioListItem";

const styles = StyleSheet.create({
  listContainer: {
    paddingLeft: 10,
    paddingVertical: 10,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    borderRightColor: "white",
    borderRightWidth: 2,
  },
  activeItem: {
    backgroundColor: "#d406d479",
  },
  normalIcon: {
    borderColor: "#e5e5e5",
    borderRadius: 5,
    borderWidth: 2,
  },
});

const ITEM_HEIGHT = 65;
const getItemLayout = (data, index) => {
  return {
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  };
};

// const getIcon = (isCurrent, isPlaying) => {
//   if (isCurrent) {
//     if (isPlaying)
//       return (
//         <View style={[styles.iconContainer]}>
//           <FontAwesome5 name="play" size={30} color="white" />
//         </View>
//       );
//     else
//       return (
//         <View style={[styles.iconContainer]}>
//           <AntDesign name="pause" size={40} color="white" />
//         </View>
//       );
//   } else
//     return (
//       <View style={[styles.iconContainer, styles.normalIcon]}>
//         <SimpleLineIcons name="music-tone" size={30} color={color.primary} />
//       </View>
//     );
// };

export default function index() {
  let { mediaInfo } = useContext(MediaContext);

  const renderItem = ({ item, index }) => (
    <AudioListItem item={item} index={index} />
  );
  const keyExtractor = (item) => item.id;


  return (
    <FlatList
      style={styles.listContainer}
      data={mediaInfo.audioList}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={{ gap: 10 }}
      getItemLayout={getItemLayout}
    />
    // {/* <OptionModal onClose={onCloseModal} {...modal} /> */}
  );
}
