import { Audio } from "expo-av";
import { createContext, useContext, useEffect, useState } from "react";

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

  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
    });
  }, []);

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

export const usePlayerInfo = () => {
  const playerCtx = useContext(PlayerContext);

  return playerCtx;
};

export default PlayerContext;