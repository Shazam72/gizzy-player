import {
    StyleSheet,
    Text,
    TextInputProps,
    TextInput,
    View,
    Dimensions,
    ViewStyle,
    TextStyle,
  } from "react-native";
  import React, { Ref, forwardRef } from "react";
  import color from "../../configs/color";
    
  type Styles = ViewStyle | TextStyle;
  export type StyleFunction = (style?: Styles) => Styles;
  export type IconRender = (style?: Styles) => React.ReactNode;
  
  export interface InputProps extends TextInputProps {
    ref?: Ref<TextInput>;
    searchBarContainerStyle?: StyleFunction;
    inputStyle?: StyleFunction;
  }
  
  const Input = ({
    placeholder,
    ref,
    searchBarContainerStyle = (style = styles.wrapper) => style,
    inputStyle = (style = styles.input) => style,
    ...props
  }: InputProps) => {
    searchBarContainerStyle();
    return (
      <View style={searchBarContainerStyle(styles.wrapper)}>
        <TextInput
          style={inputStyle(styles.input)}
          ref={ref}
          placeholder={placeholder}
          {...props}
        />
      </View>
    );
  };
  
  export default forwardRef((props: InputProps, ref: Ref<TextInput>) => (
    <Input {...props} ref={ref} />
  ));
  
  const styles = StyleSheet.create({
    wrapper: {
      borderWidth: 2,
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
  