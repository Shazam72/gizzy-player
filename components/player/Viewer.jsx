import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function Viewer() {
  return (
    <View style={[styles.wrapper]}>
      <MaterialCommunityIcons style={styles.musicCircle} name="music-circle" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems:"center",
    justifyContent:"center",
    // borderColor:"red",
    // borderWidth:2
  },
  musicCircle:{
    fontSize:360,
    color:"gray"
  }
});
