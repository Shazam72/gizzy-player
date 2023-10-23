import { useMemo, useContext } from "react";
import MediaContext from "../contexts/media";
import {
  pauseAudio,
  playAnotherAudio,
  resumeAudio,
  playAudio,
} from "../utils/audio-control";

export const usePlayerControls = () => {
  const { playerInfo,updatePlayerInfo } = useContext(MediaContext);
  const {
    playerStatus,
    playerObj,
    currentAudioIndex,
    totalCount,
    audioList,
    currentAudio,
    
  } = playerInfo;

  const playPause = async () => {
    let status = null;
    if (!playerStatus.isPlaying && playerStatus.isLoaded)
      status = await resumeAudio(playerObj);

    if (playerStatus.isPlaying && playerStatus.isLoaded)
      status = await pauseAudio(playerObj);

    updatePlayerInfo({ playerStatus: status });
  };
  const next = async () => {};
  const prev = async () => {};

  return {
    prev,
    next,
    playPause,
  };
};
