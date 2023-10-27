export default (timeInSeconds = 0) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.round(timeInSeconds % 60);
  return `${minutes}:${seconds}`;
};
