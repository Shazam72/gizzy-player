import { createContext, useState } from "react";

export interface IPlaylistContext {
  addingList?: string[];
  addAudioToAddingList?: (id: string) => void;
  removeAudioFromAddingList?: (id: string) => void;
}

export const PlaylistContext = createContext<IPlaylistContext>(null);

export const PlaylistContextProvider = ({ children }) => {
  const [addingList, setAddingList] = useState<string[]>([]);
  const addAudioToAddingList = (id: string) => {
    setAddingList((v) => [...v, id]);
  };
  const removeAudioFromAddingList = (id: string) => {
    setAddingList((v) => v.filter((e) => e != id));
  };

  return (
    <PlaylistContext.Provider
      value={{ addAudioToAddingList, removeAudioFromAddingList, addingList }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
