import React, {
  useState,
  useEffect,
  createContext,
  useRef,
  useContext,
  useCallback,
} from "react";
import * as MediaLibrary from "expo-media-library";
import { checkPermissions, getAssets } from "../utils/media";

export interface MediaInfoInterface {
  totalCount?: number;
  audioList?: MediaLibrary.Asset[];
  currentBatch?: number;
}

export interface MediaContextInterface {
  mediaInfo: MediaInfoInterface;
  updateMediaInfo: React.Dispatch<MediaInfoInterface>;
  getAudioIndexByURI?: (
    uri: string,
    autoCompletefilePrefix?: boolean,
    list?: MediaLibrary.Asset[]
  ) => number;
}

const MediaContext = createContext<MediaContextInterface>(null);






export const MediaContextProvider = ({ children }) => {
  const [mediaInfo, setMediaInfo] = useState<MediaInfoInterface>({
    totalCount: 0,
    audioList: [],
  });

  const updateMediaInfo = (newMediaInfo: MediaInfoInterface) => {
    setMediaInfo((v) => ({ ...v, ...newMediaInfo }));
  };

  useEffect(() => {
    checkPermissions().then((permission) => {
      if (permission === true) {
        getAssets(mediaInfo.currentBatch).then((filesInfo) => {
          updateMediaInfo({
            totalCount: filesInfo.audioList.length,
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

export const useMediaContext: () => MediaContextInterface = () => {
  const mediaCtx: MediaContextInterface = useContext(MediaContext);

  const getAudioIndexByURI: (
    uri: string,
    autoCompletefilePrefix: boolean,
    list: MediaLibrary.Asset[]
  ) => number = useCallback(
    (uri, autoCompletefilePrefix, list = mediaCtx.mediaInfo.audioList) => {
      let fullURI = uri;
      if (autoCompletefilePrefix) fullURI = "file://" + fullURI;
      return list.findIndex((audio) => audio.uri == fullURI);
    },
    [mediaCtx.mediaInfo.audioList]
  );

  return { ...mediaCtx, getAudioIndexByURI };
};

export default MediaContext;
