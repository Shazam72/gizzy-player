import { StyleSheet, Text, View } from "react-native";
import React from "react";
import color from "../../configs/color";

type CheckboxProps = {
  checked?: boolean;
};

const Checkbox = ({ checked = true }: CheckboxProps) => {
  return (
    <View
      style={[styles.wrapper, checked ? styles.checked : styles.unchecked]}
    ></View>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: "lightgray",
    width: 17,
    height: 17,
    borderRadius:2
  },
  checked: {
    backgroundColor: "blue",
  },
  unchecked: {
    backgroundColor: "transparent",
  },
});
