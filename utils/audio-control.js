export const playAudio = async (playerObj, uri) => {
  const currentStatus = await playerObj.getStatusAsync();
  if (currentStatus.isLoaded) {
    await playerObj.stopAsync();
    await playerObj.unloadAsync();
  }

  return await playerObj.loadAsync({ uri }, { shouldPlay: true });
};

export const pauseAudio = async (playerObj) => {
  return await playerObj.setStatusAsync({ shouldPlay: false });
};
export const resumeAudio = async (playerObj) => {
  return await playerObj.playAsync();
};
