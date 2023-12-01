import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import color from "../configs/color";
import SearchBar from "../components/_partials/SearchBar";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const PLAYLIST_ITEM_WIDTH =
  SCREEN_WIDTH * 0.4 <= 170 ? SCREEN_WIDTH * 0.4 : 170;
const PLAYLIST_ITEM_HEIGHT = PLAYLIST_ITEM_WIDTH;
const LIST_NUM_COLUMNS = Math.floor(SCREEN_WIDTH / PLAYLIST_ITEM_WIDTH);

const PLAYLIST_NAMES = [
  "playlist 3",
  "playlist 10",
  "playlist 7",
  "playlist 4",
  "playlist 6",
  "playlist 1",
  "playlist 8",
  "playlist 0",
  "playlist 2",
  "playlist 9",
  "playlist 5",
];

export default function Playlists() {
  const [searchValue, setSearchValue] = useState("");
  const data = useMemo(() => {
    return PLAYLIST_NAMES.filter((item) =>
      item.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }, [PLAYLIST_NAMES, searchValue]);
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
          {item}
        </Text>
      </View>
    );
  }, []);

  return (
    <>
      <View style={{ padding: 10 }}>
        <SearchBar
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder="Rechercher..."
        />
      </View>
      <View style={styles.wrapper}>
        <FlatList
          data={data}
          numColumns={LIST_NUM_COLUMNS}
          columnWrapperStyle={{ justifyContent: "center" }}
          contentContainerStyle={styles.playlistContainer}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
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
