import { AVPlaybackStatus, Audio } from "expo-av";
import { Asset } from "expo-media-library";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface PlayerInfoInterface {
  playerStatus?: AVPlaybackStatus | null;
  playerObj?: Audio.Sound;
  currentAudio?: Asset | null;
  currentAudioIndex?: number;
}

export interface PlayerContextInterface {
  playerInfo: PlayerInfoInterface;
  updatePlayerInfo: React.Dispatch<PlayerInfoInterface>;
}

const PlayerContext = createContext<PlayerContextInterface>(null);

export const PlayerContextProvider = ({ children }) => {
  const [playerInfo, setPlayerInfo] = useState<PlayerInfoInterface>({
    playerStatus: null,
    playerObj: new Audio.Sound(),
    currentAudio: null,
    currentAudioIndex: -1,
  });
  const updatePlayerInfo = (newState: PlayerInfoInterface) => {
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
