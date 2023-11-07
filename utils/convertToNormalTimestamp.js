export default (timeInSeconds = 0) => {
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = Math.round(timeInSeconds % 60);

  if (seconds.toString().length == 1) seconds = "0" + seconds;

  return `${minutes}:${seconds}`;
};
