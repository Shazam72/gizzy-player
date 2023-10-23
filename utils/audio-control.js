export const playAudio = async (playerObj, uri) => {
  return await playerObj.loadAsync({ uri }, { shouldPlay: true });
};

export const playAnotherAudio = async (playerObj, uri) => {
  await playerObj.stopAsync();
  await playerObj.unloadAsync();
  return await playAudio(playerObj, uri);
};
export const pauseAudio = async (playerObj) => {
  return await playerObj.setStatusAsync({ shouldPlay: false });
};
export const resumeAudio = async (playerObj) => {
  return await playerObj.playAsync();
};