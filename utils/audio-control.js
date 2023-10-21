const playAudio = async (playerObj, uri) => {
  return await playerObj.loadAsync({ uri }, { shouldPlay: true });
};

const playAnotherAudio = async (playerObj, uri) => {
  await playerObj.stopAsync();
  await playerObj.unloadAsync();
  return await playAudio(playerObj, uri);
};
const pauseAudio = async (playerObj) => {
  return await playerObj.setStatusAsync({ shouldPlay: false });
};
const resumeAudio = async (playerObj) => {
  return await playerObj.playAsync();
};

export {
  playAnotherAudio,
  pauseAudio,
  playAudio,
  resumeAudio,
};
