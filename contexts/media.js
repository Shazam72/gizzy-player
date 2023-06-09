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

export const playAudio = async (playerObj, uri) => {
  return await playerObj.loadAsync({ uri }, { shouldPlay: true });
};
export const playAnotherAudio = async (playerObj, uri) => {
  await playerObj.stopAsync();
  await playerObj.unloadAsync();
  return await playAudio(playerObj, uri);
};
export const pauseAudio = async (playerObj) => {
  return await playerObj.setStatusAsync({ shouldPlay: false });
};
export const resumeAudio = async (playerObj) => {
  return await playerObj.playAsync();
};

export const MediaContextProvider = ({ children }) => {
  const [mediaInfo, setMediaInfo] = useState({
    audioList: [],
    granted: false,
  });
  const [playerInfo, setPlayerInfo] = useState({
    currentAudio: null,
    playerStatus: null,
    playerObj: new Audio.Sound(),
    currentAudioIndex: null,
  });

  const filteredAudioList = useMemo(() => {
    let list = exludeAudioFromDirectories(mediaInfo.audioList);
    return list;
  }, [mediaInfo.audioList]);

  const getAudioFiles = useCallback(async () => {
    let list = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    });
    list = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: list.totalCount,
    });
    setMediaInfo((v) => ({
      ...v,
      granted: true,
      audioList: [...list.assets],
    }));
  }, []);
  const askPermission = useCallback(async () => {
    let { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();

    if (status === "denied" && canAskAgain) {
      alert("Vous devez autorizer les permissions");
      return;
    }
    if (status === "denied" && !canAskAgain) {
      setMediaInfo({ granted: false });
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
      setMediaInfo({ granted: false });

      return;
    }
    if (permissionStatus.granted) {
      getAudioFiles();
    }
  },[]);

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
        audioList: filteredAudioList,
        updatePlayerInfo,
        playerInfo,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export default MediaContext;
