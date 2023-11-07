import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import React, { memo, useCallback, useContext } from "react";
import color from "../configs/color";
import convertToNormalTimestamp from "../utils/convertToNormalTimestamp";
import { SimpleLineIcons } from "@expo/vector-icons";
import PlayerContext from "../contexts/player";
import { useMediaContext } from "../contexts/media";
import { useNavigation } from "expo-router";
import { playAnotherAudio, playAudio } from "../utils/audio-control";

const OptionItem = ({
  library: LibraryName,
  name,
  size = 17,
  color = "black",
  optionName = "Option name",
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.optionItemContainer} onPress={onPress}>
      <View style={styles.optionItemIconContainer}>
        <LibraryName name={name} size={size} color={color} />
      </View>
      <Text style={styles.optionItemTitle}>{optionName}</Text>
    </TouchableOpacity>
  );
};

export default function OptionModal({ visible, onClose, item, index }) {
  const { mediaInfo, getAudioIndexByURI } = useMediaContext();
  const { playerInfo, updatePlayerInfo } = useContext(PlayerContext);
  const { playerObj } = playerInfo;
  const navigation = useNavigation();

  const onListeningOptionPress = async () => {
    let currentStatus = await playerObj.getStatusAsync();
    let status = null;

    if (currentStatus.isLoaded) {
      await playerObj.stopAsync();
      await playerObj.unloadAsync();
    }

    status = await playAudio(playerObj, item.uri);
    updatePlayerInfo({
      currentAudio: item,
      currentAudioIndex: index,
      playerStatus: status,
    });
    return navigation.navigate("player");
  };
  const addAsFavourite = () => {};
  const addToPlaylist = () => {
    navigation.navigate("playlists");
  };

  return (
    <Modal
      transparent
      animationType="slide"
      useNativeDriver={true}
      visible={visible}
    >
      <View style={styles.container}>
        <View style={styles.modalHead}>
          <View style={styles.iconContainer}>
            <SimpleLineIcons
              color={color.primary}
              size={20}
              name="music-tone"
            />
          </View>
          <View style={styles.audioInfo}>
            <Text style={styles.audioTitle}>{item?.filename}</Text>
            <Text style={styles.audioSubTitle}>
              {`Duration:  ${convertToNormalTimestamp(item?.duration)}`}
            </Text>
          </View>
        </View>

        <View style={styles.optionsContainer}>
          <OptionItem
            library={FontAwesome5}
            size={22}
            name="play"
            color="black"
            optionName="Écouter"
            onPress={onListeningOptionPress}
          />
          <OptionItem
            library={MaterialIcons}
            size={24}
            name="favorite-outline"
            color="black"
            optionName="Favoris"
            onPress={addAsFavourite}
          />
          <OptionItem
            library={FontAwesome5}
            size={24}
            name="plus-square"
            color="black"
            optionName="Ajouter à une playlist"
            onPress={addToPlaylist}
          />
        </View>
      </View>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBack} />
      </TouchableWithoutFeedback>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 1000,
  },
  modalHead: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    paddingVertical: 5,
    color: color.base,
  },
  modalBack: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: "#03030348",
    zIndex: 999,
  },
  audioInfo: {
    flex: 1,
  },
  audioTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  audioSubTitle: {
    color: "gray",
    fontWeight: "600",
  },
  optionsContainer: {
    gap: 10,
    paddingVertical: 10,
  },
  optionItemContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  optionItemIconContainer: {
    width: 27,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth:2,
    // borderColor:"red"
  },
  optionItemTitle: {
    fontWeight: "500",
    fontSize: 15,
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
