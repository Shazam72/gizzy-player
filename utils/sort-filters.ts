import * as MediaLibrary from 'expo-media-library';
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

export type FilterKeyOptions =
  | "filename"
  | "default"
  | "mediaType"
  | "width"
  | "height"
  | "creationTime"
  | "modificationTime"
  | "duration";
type FilterOrder = "asc" | "desc";

export const orderFilter: (
  array: MediaLibrary.Asset[],
  filterKey?: FilterKeyOptions,
  order?: FilterOrder
) => MediaLibrary.Asset[] = (array, filterKey = "filename", order = "asc") => {
  if (array.length == 0) return array;

  return array.sort((a, b) => {
    const aKey = a[filterKey];
    const bKey = b[filterKey];

    if (aKey > bKey) return order == "asc" ? 1 : -1;
    if (aKey < bKey) return order == "asc" ? -1 : 1;
    return 0;
  });
};
