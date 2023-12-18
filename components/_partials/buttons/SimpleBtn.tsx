import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

type SimpleBtnProps = {
  children?: React.ReactNode;
  text?: string;
  color?: string;
  bgColor?: string;
  onPress?: () => void;
};

const SimpleBtn = ({
  children,
  text,
  color,
  bgColor,
  onPress=()=>{},
}: SimpleBtnProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, { backgroundColor: bgColor }]}
    >
      {text ? (
        <Text style={[styles.text, { color: color }]}>{text}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export default SimpleBtn;

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 7,
    backgroundColor: "pink",
    gap: 5,
    marginVertical: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
  },
});
