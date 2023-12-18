import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Modal,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useContext,
} from "react";
import {
  SimpleLineIcons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import color from "../../configs/color";
import SearchBar from "../../components/_partials/SearchBar";
import { IPlaylist, getPlaylists } from "../../utils/media/playlist";
import { TouchableOpacity } from "react-native-gesture-handler";
import BasicModal from "../../components/_partials/Modal";
import { Link, Stack } from "expo-router";
import { PlaylistContext } from "../../contexts/playlist";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const PLAYLIST_ITEM_WIDTH =
  SCREEN_WIDTH * 0.4 <= 170 ? SCREEN_WIDTH * 0.4 : 170;
const PLAYLIST_ITEM_HEIGHT = PLAYLIST_ITEM_WIDTH;
const LIST_NUM_COLUMNS = Math.floor(SCREEN_WIDTH / PLAYLIST_ITEM_WIDTH);

const ListHeaderComponent = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
      }}
    >
      <Link href="/playlists/add">
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 7,
            backgroundColor: "pink",
            gap: 5,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 15, color: "white" }}>
            Add playlist
          </Text>
          <MaterialCommunityIcons
            name="playlist-plus"
            size={24}
            color="white"
          />
        </View>
      </Link>
      <View style={{}}>
        <FontAwesome5 name="sort" size={18} color="black" />
      </View>
    </View>
  );
};

const ListEmptyComponent = () => (
  <View style={{ alignItems: "center", justifyContent: "center" }}>
    <Text>No playlists founded</Text>
  </View>
);

const PlaylistAddModal = () => {
  return <Modal animationType="fade"></Modal>;
};

export default function Playlists() {
  const [searchValue, setSearchValue] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const { playlists } = useContext(PlaylistContext);

  const addModal = () => setModalVisible(true);
  const onModalClose = () => setModalVisible(false);
  const data = useMemo(() => {
    return playlists.filter(({ name }) =>
      name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }, [playlists, searchValue]);

  const renderItem = useCallback(({ item, index }) => {
    return (
      <View style={styles.playlistItemContainer}>
        <View style={styles.playlistItemIconContainer}>
          <View style={styles.playlistItemIcon}>
            <SimpleLineIcons
              size={PLAYLIST_ITEM_WIDTH * 0.4}
              name="playlist"
              color="purple"
            />
          </View>
        </View>
        <Text numberOfLines={2} style={styles.playlistItemText}>
          {item.name}
        </Text>
      </View>
    );
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: "Playlists" }} />
      <View style={{ padding: 10 }}>
        <SearchBar
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder="Rechercher..."
        />
      </View>
      <View style={styles.listWrapper}>
        <FlatList
          data={data}
          numColumns={LIST_NUM_COLUMNS}
          columnWrapperStyle={{ justifyContent: "center" }}
          contentContainerStyle={styles.playlistContainer}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<ListEmptyComponent />}
          ListHeaderComponent={<ListHeaderComponent />}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  listWrapper: {
    flex: 1,
  },
  playlistContainer: {
    paddingHorizontal: 10,
    width: SCREEN_WIDTH,
  },
  playlistItemContainer: {
    width: PLAYLIST_ITEM_WIDTH,
    height: PLAYLIST_ITEM_HEIGHT,
    marginHorizontal: 15,
    marginVertical: 20,
    alignSelf: "flex-start",
  },
  playlistItemIconContainer: {
    borderRadius: 7,
    borderWidth: 2,
    borderColor: color.lightGray,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  playlistItemIcon: {
    borderWidth: 2,
    borderColor: "purple",
    borderRadius: PLAYLIST_ITEM_WIDTH,
    width: PLAYLIST_ITEM_WIDTH * 0.7,
    height: PLAYLIST_ITEM_WIDTH * 0.7,
    justifyContent: "center",
    alignItems: "center",
  },
  playlistItemText: {
    textAlign: "center",
    fontWeight: "500",
  },
});
