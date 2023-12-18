import { Asset } from "expo-media-library";
import { createContext, useEffect, useState } from "react";
import { IPlaylist, getPlaylists } from "../utils/media/playlist";

export interface IPlaylistContext {
  addingList?: Asset[];
  addAudioToAddingList?: (item: Asset) => void;
  resetAddingList?: () => void;
  playlists?: IPlaylist[];
}

export const PlaylistContext = createContext<IPlaylistContext>(null);

export const PlaylistContextProvider = ({ children }) => {
  const [addingList, setAddingList] = useState<Asset[]>([]);
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);

  const addAudioToAddingList = (item: Asset) => {
    setAddingList((v) => {
      const isInList = v.findIndex((i) => i.id == item.id);
      if (isInList == -1) return [...v, item];
      else return v.filter((e) => e.id != item.id);
    });
  };

  const resetAddingList = () => setAddingList([]);

  useEffect(() => {
    getPlaylists().then((lists) => {
      setPlaylists(lists);
    });
  }, []);

  return (
    <PlaylistContext.Provider
      value={{ addAudioToAddingList, addingList, resetAddingList, playlists }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
