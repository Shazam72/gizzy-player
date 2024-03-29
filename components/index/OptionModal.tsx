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
import color from "../../configs/color";
import convertToNormalTimestamp from "../../utils/convertToNormalTimestamp";
import { SimpleLineIcons } from "@expo/vector-icons";
import PlayerContext from "../../contexts/player";
import { useMediaContext } from "../../contexts/media";
import { useNavigation } from "expo-router";
import { playAudio } from "../../utils/audio-control";
import { Asset } from "expo-media-library";
import { ModalFunctionsType } from "./AudioList";
import BasicModal from "../_partials/Modal";

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

type OptionModalProps = {
  visible?: boolean;
  item: Asset;
  index: number;
  onClose: () => void;
  modalOptionsFunctions: ModalFunctionsType;
};

export default function OptionModal({
  visible,
  onClose,
  item,
  index,
  modalOptionsFunctions,
}: OptionModalProps) {
  const onListeningPress = () =>
    modalOptionsFunctions.onListeningOptionPress(item, index);
  const onFavouritePress = () =>
    modalOptionsFunctions.addAsFavourite(item, index);
  const onAddPlaylistPress = () =>
    modalOptionsFunctions.addToPlaylist(item, index);

  return (
    <BasicModal
      onClose={onClose}
      transparent
      animationType="slide"
      // useNativeDriver={true}
      visible={visible}
    >
      <View style={styles.modalHead}>
        <View style={styles.iconContainer}>
          <SimpleLineIcons color={color.primary} size={20} name="music-tone" />
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
          onPress={onListeningPress}
        />
        <OptionItem
          library={MaterialIcons}
          size={24}
          name="favorite-outline"
          color="black"
          optionName="Favoris"
          onPress={onFavouritePress}
        />
        <OptionItem
          library={FontAwesome5}
          size={24}
          name="plus-square"
          color="black"
          optionName="Ajouter à une playlist"
          onPress={onAddPlaylistPress}
        />
      </View>
    </BasicModal>
  );
}
const styles = StyleSheet.create({

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
