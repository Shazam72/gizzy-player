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
  const [playbackStatus, setPlaybackStatus] = useState({});
  

  const updatePlaybackStatus = (newState) => {
    setPlaybackStatus((v) => ({ ...v, ...newState }));
  };
  const updatePlayerInfo = (newState) => {
    setPlayerInfo((v) => ({ ...v, ...newState }));
  };

  return (
    <PlayerContext.Provider
      value={{
        playerInfo,
        playbackStatus,
        updatePlayerInfo,
        updatePlaybackStatus
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContext;
