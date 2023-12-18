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

export const createPlaylist: (playlist: IPlaylist) => Promise<boolean> = async (playlist) => {

    try {
        const lists = await getPlaylists()
        await AsyncStorage.setItem('plalists', JSON.stringify(lists))
    } catch (error) {
        console.log('Error while saving playlist: ', error);
        return false
    }


}