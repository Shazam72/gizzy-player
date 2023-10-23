export const exludeAudioFromDirectories = (
  list = [],
  directories = ["file:///storage/emulated/0/Android/media/com."]
) => {
  let filteredList = list.filter((item) => {
    let shoulBeKeeped = true;

    shoulBeKeeped = directories.reduce((prevTest, dir) => {
      return !String(item?.uri).includes(dir) && prevTest;
    }, shoulBeKeeped);

    return shoulBeKeeped;
  });
  return filteredList;
};
