import { Asset } from "expo-media-library";
import { createContext, useState } from "react";

export interface IPlaylistContext {
  addingList?: Asset[];
  addAudioToAddingList?: (item: Asset) => void;
  removeAudioFromAddingList?: (item: Asset) => void;
}

export const PlaylistContext = createContext<IPlaylistContext>(null);

export const PlaylistContextProvider = ({ children }) => {
  const [addingList, setAddingList] = useState<Asset[]>([]);
  const addAudioToAddingList = (item: Asset) => {
    setAddingList((v) => [...v, item]);
  };
  const removeAudioFromAddingList = (item: Asset) => {
    setAddingList((v) => v.filter((e) => e.id != item.id));
  };

  return (
    <PlaylistContext.Provider
      value={{ addAudioToAddingList, removeAudioFromAddingList, addingList }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
