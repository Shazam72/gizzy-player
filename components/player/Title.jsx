import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";

export default Title = memo(({ children }) => {
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
