import { FlatList, StyleSheet, View } from "react-native";
import React, { useCallback, useState, useMemo } from "react";
import MusicListItem from "./MusicListItem";

import { Asset } from "expo-media-library";
import { FilterKeyOptions, orderFilter } from "../../utils/sort-filters";

const keyExtractor = (item) => item.id;

export interface MusicListProps {
  list: Asset[];
  onItemPress: (item: Asset, index: number) => void;
  showItemOption?: boolean;
  onItemOptionsPress: (item: Asset, index: number) => void | any;
  filterOrder?: "asc" | "desc";
  filterKey?: FilterKeyOptions;
}

export default function MusicList({
  list,
  showItemOption=true,
  onItemOptionsPress,
  onItemPress,
  filterKey = "filename",
  filterOrder = "asc",
}: MusicListProps) {
  const filteredList = useMemo(() => {
    return orderFilter(list, filterKey, filterOrder);
  }, [list]);

  const onListItemPress = useCallback(
    (item: Asset, index: number) => onItemPress(item, index),
    [onItemPress]
  );

  const onListItemOptionsPress = useCallback(
    (item: Asset, index: number) => onItemOptionsPress(item, index),
    [onItemOptionsPress]
  );

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <MusicListItem
          onItemPress={onListItemPress}
          onOptionPress={onListItemOptionsPress}
          item={item}
          index={index}
          showItemOption
        />
      );
    },
    [onListItemPress, onListItemOptionsPress, showItemOption]
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
