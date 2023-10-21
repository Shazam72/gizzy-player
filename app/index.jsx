import { StyleSheet, View, FlatList } from "react-native";
import { useState, useCallback, useContext } from "react";
import {
  pauseAudio,
  playAnotherAudio,
  playAudio,
  resumeAudio,
} from "../utils/audio-control";
import MediaContext from "../contexts/media";
import AudioItem from "../components/AudioItem";
import OptionModal from "../components/OptionModal";
import { useSharedValue } from "react-native-reanimated";
import {
  Entypo,
  SimpleLineIcons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";
import color from "../configs/color";

const styles = StyleSheet.create({
  listContainer: {
    paddingLeft: 10,
    paddingVertical: 10,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    borderRightColor: "white",
    borderRightWidth: 2,
  },
  activeItem: {
    backgroundColor: "#d406d479",
  },
  normalIcon: {
    borderColor: "#e5e5e5",
    borderRadius: 5,
    borderWidth: 2,
  },
});

const ITEM_HEIGHT = 65;
const getItemLayout = (data, index) => {
  return {
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  };
};

const getIcon = (isCurrent, isPlaying) => {
  if (isCurrent) {
    if (isPlaying)
      return (
        <View style={[styles.iconContainer]}>
          <FontAwesome5 name="play" size={30} color="white" />
        </View>
      );
    else
      return (
        <View style={[styles.iconContainer]}>
          <AntDesign name="pause" size={40} color="white" />
        </View>
      );
  } else
    return (
      <View style={[styles.iconContainer, styles.normalIcon]}>
        <SimpleLineIcons name="music-tone" size={30} color={color.primary} />
      </View>
    );
};

export default function index() {
  let { updatePlayerInfo, playerInfo } = useContext(MediaContext);
  const [modal, setModal] = useState({
    item: {},
    visible: false,
  });
  const viItems = useSharedValue([]);

  const onAudioItemPress = async (audioItem, index) => {
    const { currentAudio, playerStatus, playerObj } = playerInfo;
    if (playerStatus === null) {
      const status = await playAudio(playerObj, audioItem.uri);
      return updatePlayerInfo({
        currentAudio: audioItem,
        playerStatus: status,
        currentAudioIndex: index,
      });
    }
    if (currentAudio.id === audioItem.id) {
      let status = null;
      if (!playerStatus.isPlaying && playerStatus.isLoaded)
        status = await resumeAudio(playerObj);

      if (playerStatus.isPlaying && playerStatus.isLoaded)
        status = await pauseAudio(playerObj);

      return updatePlayerInfo({ playerStatus: status });
    } else {
      let status = await playAnotherAudio(playerObj, audioItem.uri);
      return updatePlayerInfo({
        currentAudio: audioItem,
        playerStatus: status,
        currentAudioIndex: index,
      });
    }
  };

  const keyExtractor = useCallback((item) => item.id, []);

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    viItems.value = viewableItems;
  }, []);

  const renderItem = useCallback(
    (props) => {
      let isCurrent = playerInfo?.currentAudioIndex === props.index;
      let isPlaying = Boolean(playerInfo?.playerStatus?.isPlaying);
      return (
        <AudioItem
          viewableItems={viItems}
          onOptionPress={onOptionPress}
          onAudioItemPress={onAudioItemPress}
          isPlaying={isPlaying}
          icon={getIcon(isCurrent, isPlaying)}
          isCurrent={isCurrent}
          {...props}
        />
      );
    },
    [playerInfo.playerStatus, playerInfo.currentAudioIndex]
  );
  return (
    <>
      <FlatList
        style={styles.listContainer}
        data={playerInfo.audioList}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 10 }}
        onViewableItemsChanged={onViewableItemsChanged}
        // getItemLayout={getItemLayout}
      />
      <OptionModal onClose={onCloseModal} {...modal} />
    </>
  );

  function onOptionPress(item) {
    setModal({ visible: true, item });
  }

  function onCloseModal() {
    return setModal({ item: {}, visible: false });
  }
}
