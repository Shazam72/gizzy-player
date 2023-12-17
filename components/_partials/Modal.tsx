import {
  Modal,
  ModalProps,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import color from "../../configs/color";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("screen");

export interface BasicModalProps extends ModalProps {
  onClose: () => void;
  position?: "middle" | "top" | "bottom";
}

const BasicModal = ({
  onClose,
  position = "bottom",
  children,
  ...props
}: BasicModalProps) => {
  return (
    <Modal {...props}>
      <View style={styles.container}>{children}</View>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBack} />
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BasicModal;

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
  modalBack: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: "#03030348",
    zIndex: 999,
  },
  atBottom: {},
  atTop: {},
  atMiddle: {},
});
