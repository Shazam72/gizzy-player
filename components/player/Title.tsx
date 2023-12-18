import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";

type TitleProps ={
  children: React.ReactNode
}

export default memo(({ children }: TitleProps) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>
        {children}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
