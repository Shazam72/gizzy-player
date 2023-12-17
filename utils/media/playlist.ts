import * as MediaLibrary from 'expo-media-library';
import AsyncStorage from "@react-native-async-storage/async-storage"

export interface IPlaylist {
    name: string,
    audios: MediaLibrary.Asset[],
}

export const getPlaylists: () => Promise<IPlaylist[]> = async () => {

    let playLists: IPlaylist[] = []

    try {
        let lists = await AsyncStorage.getItem('playlists')
        if (lists) playLists = JSON.parse(lists)


    } catch (error) {
        console.log('Error loading getting playlists: ', error);

    }

    return playLists

}