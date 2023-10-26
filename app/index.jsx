import { View } from "react-native";
import React from "react";
import { useMediaContext } from "../contexts/media";

import AudioList from "../components/index/AudioList";

export default function index() {
  let { mediaInfo } = useMediaContext();

  return (
    <View>
      <AudioList list={mediaInfo.audioList} />
    </View>
    // {/* <OptionModal onClose={onCloseModal} {...modal} /> */}
  );
}
