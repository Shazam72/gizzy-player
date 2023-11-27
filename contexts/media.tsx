import React, {
  useState,
  useEffect,
  createContext,
  useRef,
  useContext,
  useCallback,
} from "react";
import * as MediaLibrary from "expo-media-library";
import { exludeAudioFromDirectories } from "../utils/sort-filters";

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
type FilterKeyOptions =
  | "filename"
  | "default"
  | "mediaType"
  | "width"
  | "height"
  | "creationTime"
  | "modificationTime"
  | "duration";
type FilterOrder = "asc" | "desc";
const audioFilter: (
  array: MediaLibrary.Asset[],
  filterKey?: FilterKeyOptions,
  order?: FilterOrder
) => MediaLibrary.Asset[] = (array, filterKey = "filename", order = "asc") => {
  if (array.length == 0) return array;

  return array.sort((a, b) => {
    const aKey = a[filterKey];
    const bKey = b[filterKey];

    if (aKey > bKey) return order == "asc" ? 1 : -1;
    if (aKey < bKey) return order == "asc" ? -1 : 1;
    return 0;
  });
};

const getAssets = async (batch = 0, first = 20) => {
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
