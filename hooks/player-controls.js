import { useMemo, useContext } from "react";
import {
  pauseAudio,
  playAnotherAudio,
  resumeAudio,
  playAudio,
} from "../utils/audio-control";
import PlayerContext from "../contexts/player";
import MediaContext from "../contexts/media";

export const usePlayerControls = () => {
  const { mediaInfo } = useContext(MediaContext);
  const { totalCount, audioList } = mediaInfo;
  const { playerInfo, updatePlayerInfo } = useContext(PlayerContext);
  const { playerStatus, playerObj, currentAudioIndex } = playerInfo;

  const playPause = async () => {
    let status = null;
    if (!playerStatus.isPlaying && playerStatus.isLoaded)
      status = await resumeAudio(playerObj);

    if (playerStatus.isPlaying && playerStatus.isLoaded)
      status = await pauseAudio(playerObj );

    updatePlayerInfo({ playerStatus: status });
  };

  const next = async () => {
    let newCurrentAudioIndex = currentAudioIndex + 1;
    if (newCurrentAudioIndex >= totalCount) newCurrentAudioIndex = 0;
    let newCurrentAudio = audioList[newCurrentAudioIndex];
    let status = await playAnotherAudio(playerObj, newCurrentAudio.uri);
    updatePlayerInfo({
      playerStatus: status,
      currentAudioIndex: newCurrentAudioIndex,
      currentAudio: newCurrentAudio,
    });
  };

  const prev = async () => {
    let newCurrentAudioIndex = currentAudioIndex - 1;
    if (newCurrentAudioIndex < 0) newCurrentAudioIndex = totalCount - 1;
    let newCurrentAudio = audioList[newCurrentAudioIndex];
    let status = await playAnotherAudio(playerObj, newCurrentAudio.uri);
    updatePlayerInfo({
      playerStatus: status,
      currentAudioIndex: newCurrentAudioIndex,
      currentAudio: newCurrentAudio,
    });
  };

  return {
    prev,
    next,
    playPause,
  };
};
