import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { Stack, useRouter, Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Input from "../../../components/_partials/Input";
import BasicModal from "../../../components/_partials/Modal";
import MusicSelectionModal from "../../../components/playlists/add/music-selection-modal";
import MusicListItem from "../../../components/_partials/MusicListItem";
import { PlaylistContext } from "../../../contexts/playlist";
import { getAsset } from "../../../utils/media";
import { Asset } from "expo-media-library";
import SimpleBtn from "../../../components/_partials/buttons/SimpleBtn";
import { IPlaylist, createPlaylist } from "../../../utils/media/playlist";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");
const IMG_CONTAINER_SIZE = SCREEN_WIDTH * 0.6;

const Add = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { addingList, resetAddingList } = useContext(PlaylistContext);
  const inputRef = useRef(null);

  const savePlaylist = async () => {
    const playlist: IPlaylist = {
      name: inputRef.current.value,
      audios: addingList,
    };

    const playlistAdded = await createPlaylist(playlist);

    if (playlistAdded) {
      resetAddingList();
      console.log(`playlist '${playlist.name}' added`);
      return;
    }
    console.log(`Adding playlist '${playlist.name}' has failed`);
  };

  const renderItem = useCallback(
    ({ item, index }: { item: Asset; index: number }) => {
      return (
        <View>
          <Text>{item.filename}</Text>
        </View>
      );
    },
    []
  );

  return (
    <>
      <Stack.Screen options={{ title: "Add playlist" }} />
      <View style={styles.wrapper}>
        {/* <View style={styles.imgContainer}></View>
        <View style={{}}></View> */}
        <View>
          <Text style={{ marginVertical: 5 }}>Playlist name</Text>
          <Input ref={inputRef} />
        </View>
        <SimpleBtn text="Save" onPress={savePlaylist} />
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <SimpleBtn text="Add audio(s)" onPress={() => setShowModal(true)} />
          </View>
          <FlatList
            keyExtractor={(item, index) => item.id}
            data={addingList}
            renderItem={renderItem}
          />
        </View>
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
    flex: 1,
  },
  imgContainer: {
    width: IMG_CONTAINER_SIZE,
    height: IMG_CONTAINER_SIZE,
    backgroundColor: "lightgray",
    alignSelf: "center",
    marginVertical: 10,
  },
});
