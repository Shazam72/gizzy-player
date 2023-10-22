import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import MediaContext from "../../contexts/media";

export default function Title() {
  const { playerInfo } = useContext(MediaContext);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{playerInfo.currentAudio?.filename ?? "Titre non defini un bon son aj sjsjjsjjs jsjjdjdjdjdjd djdjjddjjd"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical:5,
  },
  title:{
    fontSize:20,
    fontWeight:"bold",
    textAlign:"center"
  }
});
