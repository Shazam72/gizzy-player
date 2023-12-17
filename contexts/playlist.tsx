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
    setAddingList((v) => {

        const isInList = v.findIndex(i=> i.id == item.id)
        if (isInList == -1)
            return [...v, item]
        else
            return v.filter((e) => e.id != item.id)
    })
  };
  return (
    <PlaylistContext.Provider
      value={{ addAudioToAddingList, addingList }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
