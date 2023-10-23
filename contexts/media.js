import { useState, useEffect, createContext, useRef } from "react";
import * as MediaLibrary from "expo-media-library";
import { exludeAudioFromDirectories } from "../utils/sort-filters";

const MediaContext = createContext();

const getAudioFiles = async (batch = 0, first = 20) => {
  let list = await MediaLibrary.getAssetsAsync({
    mediaType: "audio",
    // after: String(batch * first),
    // first,
  });
  list = await MediaLibrary.getAssetsAsync({
    mediaType: "audio",
    first: list.totalCount,
    // after: String(batch * first),
    // first,
  });

  return {
    // granted: true,
    totalCount: list.totalCount,
    audioList: exludeAudioFromDirectories(list.assets),
    // currentBatch: batch + 1,
  };
};

const askPermission = async () => {
  let { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();

  if (status === "granted") return true;

  if (status === "denied" && canAskAgain) {
    alert("Vous devez autorizer les permissions");
  }
  return false;
};
const checkPermissions = async () => {
  const permissionStatus = await MediaLibrary.getPermissionsAsync();
  if (!permissionStatus.granted && permissionStatus.canAskAgain) {
    return await askPermission();
  }
  if (!permissionStatus.granted && !permissionStatus.canAskAgain) {
    return false;
  }
  if (permissionStatus.granted) {
    return true;
  }
};

export const MediaContextProvider = ({ children }) => {
  const [mediaInfo, setMediaInfo] = useState({
    totalCount: null,
    audioList: [],
  });

  const updateMediaInfo = (newMediaInfo) => {
    setMediaInfo((v) => ({ ...v, ...newMediaInfo }));
  };

  useEffect(() => {
    checkPermissions().then((permission) => {
      if (permission === true) {
        getAudioFiles(mediaInfo.currentBatch).then((filesInfo) => {
          updateMediaInfo({
            totalCount: filesInfo.totalCount,
            audioList: filesInfo.audioList,
          });
        });
      }
    });
    return () => {};
  }, []);
  return (
    <MediaContext.Provider value={{ mediaInfo, updateMediaInfo }}>
      {children}
    </MediaContext.Provider>
  );
};

export default MediaContext;
