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
} from "@expo/vector-icons";
import React from "react";
import color from "../configs/color";

export default function OptionModal({ visible, onClose, item }) {
  return (
    <Modal transparent animationType="slide" useNativeDriver={true} visible={visible}>
      <View style={styles.container}>
        <View style={styles.modalHead}>
          <Text style={styles.modalHeadTitle}>Option de la musique</Text>
        </View>
        <View style={styles.audioInfo}>
          <Text style={styles.audioTitle} numOfLines={1}>
            {item?.filename}
          </Text>
          <Text style={styles.audioSubTitle}>{item?.duration}</Text>
        </View>
        
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionItemContainer}>
            <MaterialCommunityIcons
              name="playlist-plus"
              size={25}
              color="black"
            />
            <Text style={styles.optionItemTitle}>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItemContainer}>
            <MaterialIcons name="favorite-outline" size={24} color="black" />
            <Text style={styles.optionItemTitle}>Option 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItemContainer}>
            <FontAwesome5 name="plus-square" size={24} color="black" />
            <Text style={styles.optionItemTitle}>Option 3</Text>
          </TouchableOpacity>
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
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    paddingVertical: 5,
    color: color.base,
  },
  modalHeadTitle: {
    fontWeight: "bold",
    fontSize: 18,
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
    paddingVertical: 10,
  },
  audioTitle: {
    fontSize: 16.5,
    fontWeight: "600",
  },
  audioSubTitle: {
    color: "gray",
    fontWeight: "600",
  },
  optionsContainer: {
    gap: 10,
  },
  optionItemContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  optionItemTitle: {
    fontWeight: "500",
    fontSize: 15,
  },
});
