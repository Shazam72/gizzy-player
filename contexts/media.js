import { useState, useEffect, createContext } from "react";
import * as MediaLibrary from "expo-media-library";
import { Audio } from "expo-av";
import { exludeAudioFromDirectories } from "../utils/sort-filters";

const MediaContext = createContext();

const getAudioFiles = async () => {
  let list = await MediaLibrary.getAssetsAsync({
    mediaType: "audio",
  });
  list = await MediaLibrary.getAssetsAsync({
    mediaType: "audio",
    first: list.totalCount,
  });

  return {
    granted: true,
    totalCount: list.totalCount,
    audioList: exludeAudioFromDirectories(list.assets),
  };
};

const askPermission = async () => {
  let { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();

  if (status === "denied" && canAskAgain) {
    alert("Vous devez autorizer les permissions");
    return;
  }
  if (status === "denied" && !canAskAgain) {
    return false;
  }
  if (status === "granted") getAudioFiles();
};
const checkPermissions = async () => {
  const permissionStatus = await MediaLibrary.getPermissionsAsync();
  if (!permissionStatus.granted && permissionStatus.canAskAgain) {
    askPermission();
  }
  if (!permissionStatus.granted && !permissionStatus.canAskAgain) {
    return false;
  }
  if (permissionStatus.granted) {
    return await getAudioFiles();
  }
};

export const MediaContextProvider = ({ children }) => {
  const [playerInfo, setPlayerInfo] = useState({
    currentAudio: null,
    playerStatus: null,
    playerObj: new Audio.Sound(),
    currentAudioIndex: null,
    totalCount: null,
    audioList: [],
    granted: false,
  });

  console.log("render");
  const updatePlayerInfo = (newState) => {
    setPlayerInfo((v) => ({
      ...v,
      ...newState,
    }));
  };
  useEffect(() => {
    checkPermissions().then((files) => {
      if (files) updatePlayerInfo(files);
    });
    return async () => {
      if (playerInfo.playerStatus?.isPlaying) {
        await playerInfo.playerObj.setStatusAsync({ shouldPlay: false });
      }
    };
  }, []);
  return (
    <MediaContext.Provider
      value={{
        updatePlayerInfo,
        playerInfo,
        getAudioFiles,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export default MediaContext;
