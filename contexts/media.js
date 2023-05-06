import { useState, useEffect, createContext } from "react";
import * as MediaLibrary from "expo-media-library";

export default MediaContext = createContext();

export const MediaContextProvider = ({ children }) => {
  const [mediaInfo, setMediaInfo] = useState({
    audioList: [],
  });

  const getAudioFiles = async () => {
    let list = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    });
    list = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: list.totalCount,
    });
    setMediaInfo((v) => ({ ...v, audioList: [...list.assets] }));
  };
  const checkPermissions = async () => {
    const permissionStatus = await MediaLibrary.getPermissionsAsync();
console.log('ggggggggggù');
    if (!permissionStatus.granted && permissionStatus.canAskAgain) {
      let { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();
        console.log('nnnnng');

      if (status === "denied" && canAskAgain) {
        console.log('fgfgg');
        alert("Vous devez autorizer les permissions");
      }
      if (status === "denied" && !canAskAgain) {
        console.log('llllll');

        alert("Vous etes fous ?");
      }
      if (status === "granted") {
        console.log('mmmmm');

        getAudioFiles();
      }
    }
    if (permissionStatus.granted) {
      getAudioFiles();
    }
  };

  useEffect(() => {
    checkPermissions();
    return () => {};
  }, []);

  return (
    <MediaContext.Provider value={{ ...mediaInfo }}>
      {children}
    </MediaContext.Provider>
  );
};
