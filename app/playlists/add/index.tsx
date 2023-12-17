import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { createContext, useContext, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Input from "../../../components/_partials/Input";
import BasicModal from "../../../components/_partials/Modal";
import MusicSelectionModal from "../../../components/playlists/add/music-selection-modal";
import MusicListItem from "../../../components/_partials/MusicListItem";
import { PlaylistContext } from "../../../contexts/playlist";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");
const IMG_CONTAINER_SIZE = SCREEN_WIDTH * 0.6;



const Add = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const {addingList} = useContext(PlaylistContext)
  // const [list, setList] =useState<string[]>([]);
  return (
    <>
      <Stack.Screen options={{ title: "Add playlist" }} />
      <View style={styles.wrapper}>
        {/* <View style={styles.imgContainer}></View>
        <View style={{}}></View> */}
        <View>
          <Text style={{ marginVertical: 5 }}>Playlist name</Text>
          <Input />
        </View>
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 7,
            backgroundColor: "pink",
            gap: 5,
            marginVertical: 10,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 15, color: "white" }}>
            Add playlist
          </Text>
          <MaterialCommunityIcons
            name="music-note-plus"
            size={24}
            color="white"
          />
        </TouchableOpacity>

        <FlatList
          keyExtractor={(item, index) => item}
          data={addingList}
          renderItem={({ item, index }) => {
            return (
              <View>
                <Text>{item}</Text>
              </View>
            );
          }}
        />
      </View>
      <BasicModal
        transparent
        visible={showModal}
        onClose={() => setShowModal(false)}
      >
        <MusicSelectionModal />
      </BasicModal>
    </>
  );
};

export default Add;

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  imgContainer: {
    width: IMG_CONTAINER_SIZE,
    height: IMG_CONTAINER_SIZE,
    backgroundColor: "lightgray",
    alignSelf: "center",
    marginVertical: 10,
  },
});
