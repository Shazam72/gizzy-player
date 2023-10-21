import {
  useState,
  useEffect,
  createContext,
  useMemo,
  useCallback,
  useRef,
} from "react";
import * as MediaLibrary from "expo-media-library";
import { Audio } from "expo-av";

const MediaContext = createContext();

const exludeAudioFromDirectories = (
  list = [],
  directories = ["file:///storage/emulated/0/Android/media/com."]
) => {
  let filteredList = list.filter((item) => {
    let shoulBeKeeped = true;

    shoulBeKeeped = directories.reduce((prevTest, dir) => {
      return !String(item?.uri).includes(dir) && prevTest;
    }, shoulBeKeeped);

    return shoulBeKeeped;
  });
  return filteredList;
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

  const getAudioFiles = async () => {
    let list = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    });
    list = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: list.totalCount,
    });

    setPlayerInfo((v) => ({
      ...v,
      granted: true,
      totalCount: list.totalCount,
      audioList: exludeAudioFromDirectories(list.assets),
    }));
  };

  const askPermission = useCallback(async () => {
    let { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();

    if (status === "denied" && canAskAgain) {
      alert("Vous devez autorizer les permissions");
      return;
    }
    if (status === "denied" && !canAskAgain) {
      setPlayerInfo((v) => ({ ...v, granted: false }));
      return;
    }
    if (status === "granted") getAudioFiles();
  }, []);
  const checkPermissions = useCallback(async () => {
    const permissionStatus = await MediaLibrary.getPermissionsAsync();
    if (!permissionStatus.granted && permissionStatus.canAskAgain) {
      askPermission();
    }
    if (!permissionStatus.granted && !permissionStatus.canAskAgain) {
      setPlayerInfo((v) => ({ ...v, granted: false }));
      return;
    }
    if (permissionStatus.granted) {
      getAudioFiles();
    }
  }, []);

  const updatePlayerInfo = (newState) => {
    setPlayerInfo((v) => ({
      ...v,
      ...newState,
    }));
  };
  useEffect(() => {
    checkPermissions();
    return () => {};
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
