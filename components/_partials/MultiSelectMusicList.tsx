import { FlatList, StyleSheet, View } from "react-native";
import React, { useCallback, useState, useMemo } from "react";
import MultiSelectMusicListItem from "./MultiSelectMusicListItem";
import { Asset } from "expo-media-library";
import { FilterKeyOptions, orderFilter } from "../../utils/sort-filters";

const keyExtractor = (item) => item.id;

export interface MultiSelectMusicListProps {
  list: Asset[];
  onItemPress: (item: Asset, index: number) => void;
  showItemOption?: boolean;
  filterOrder?: "asc" | "desc";
  filterKey?: FilterKeyOptions;
  selecteds?: string[];
}

export default function MultiSelectMusicList({
  list,
  showItemOption = true,
  onItemPress,
  filterKey = "filename",
  filterOrder = "asc",
  selecteds,
}: MultiSelectMusicListProps) {
  const filteredList = useMemo(() => {
    return orderFilter(list, filterKey, filterOrder);
  }, [list]);

  const onListItemPress = useCallback(
    (item: Asset, index: number) => onItemPress(item, index),
    [onItemPress]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Asset; index: number }) => {
      const selected = selecteds.findIndex((v) => v == item.id);
      return (
        <MultiSelectMusicListItem
          onItemPress={onListItemPress}
          item={item}
          index={index}
          showItemOption
          selected={selected == -1 ? false : true}
        />
      );
    },
    [onListItemPress, showItemOption, selecteds]
  );

  return (
    <View>
      <FlatList
        style={styles.listContainer}
        data={filteredList}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingLeft: 10,
    paddingVertical: 10,
  },
  activeItem: {
    backgroundColor: "#d406d479",
  },
});
