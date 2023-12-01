import {
  StyleSheet,
  Text,
  TextInputProps,
  TextInput,
  View,
  StyleProp,
  Dimensions,
  ViewStyle,
  TextStyle,
} from "react-native";
import React, { Ref, forwardRef } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import color from "../../configs/color";

const { height: SCREEN_HEIGHT } = Dimensions.get("screen");

type Styles = ViewStyle | TextStyle;
export type StyleFunction = (style?: Styles) => Styles;
export type IconRender = (style?: Styles) => React.ReactNode;

export interface SearchBarProps extends TextInputProps {
  ref?: Ref<TextInput>;
  searchBarContainerStyle?: StyleFunction;
  inputStyle?: StyleFunction;
  iconStyle?: StyleFunction;
  iconSize?: number;
  iconRender?: IconRender;
}

const SearchBar = ({
  placeholder,
  ref,
  searchBarContainerStyle = (style = styles.wrapper) => style,
  inputStyle = (style = styles.input) => style,
  iconStyle = (style = styles.icon) => style,
  iconRender = (style = styles.icon) => (
    <FontAwesome5 style={style} name="search" size={18} />
  ),
  iconSize = 18,
  ...props
}: SearchBarProps) => {
  searchBarContainerStyle();
  return (
    <View style={searchBarContainerStyle(styles.wrapper)}>
      <TextInput
        style={inputStyle(styles.input)}
        ref={ref}
        placeholder={placeholder}
        {...props}
      />
      {iconRender(styles.icon)}
    </View>
  );
};

export default forwardRef((props: SearchBarProps, ref: Ref<TextInput>) => (
  <SearchBar {...props} ref={ref} />
));

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 2,
    borderRadius: 7,
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderColor: "rgba(0,0,0,0.5)",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  input: {
    fontSize: 17,
    flex: 1,
  },
  icon: {
    color: "rgba(0,0,0,0.5)",
  },
});
