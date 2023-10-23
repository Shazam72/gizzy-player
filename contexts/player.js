import { Audio } from "expo-av";
import { createContext, useState } from "react";

const PlayerContext = createContext({});

export const PlayerContextProvider = ({ children }) => {
  const [playerInfo, setPlayerInfo] = useState({
    playerStatus: null,
    playerObj: new Audio.Sound(),
    currentAudio: null,
    currentAudioIndex: null,
  });

  const updatePlayerInfo = (newState) => {
    setPlayerInfo((v) => ({ ...v, ...newState }));
  };

  return (
    <PlayerContext.Provider
      value={{
        playerInfo,
        updatePlayerInfo,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContext;
