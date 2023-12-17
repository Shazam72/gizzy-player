import * as MediaLibrary from 'expo-media-library';
import { exludeAudioFromDirectories } from '../sort-filters';

export const getAssets: (batch?: number, first?: number) => Promise<{
    totalCount?: number
    audioList?: MediaLibrary.Asset[]
    currentBatch?: number
}> = async (batch = 0, first = 20) => {
    let list = await MediaLibrary.getAssetsAsync({
        mediaType: "audio",
        // after: String(batch * first),
        // first,
    });
    list = await MediaLibrary.getAssetsAsync({
        mediaType: "audio",
        first: list.totalCount,
        // after: String(batch * first),
        // first,
    });

    return {
        totalCount: list.totalCount,
        audioList: exludeAudioFromDirectories(list.assets),
        // currentBatch: batch + 1,
    };
};
export const askPermission: () => Promise<boolean> = async () => {
    let { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();

    if (status === "granted") return true;

    if (status === "denied" && canAskAgain) {
        alert("Vous devez autorizer les permissions");
    }
    return false;
};
export const checkPermissions: () => Promise<boolean> = async () => {
    const permissionStatus = await MediaLibrary.getPermissionsAsync();
    if (!permissionStatus.granted && permissionStatus.canAskAgain) {
        return await askPermission();
    }
    if (!permissionStatus.granted && !permissionStatus.canAskAgain) {
        return false;
    }
    if (permissionStatus.granted) {
        return true;
    }
};

export const getAsset:
    (assetId: string) => Promise<MediaLibrary.Asset | null>
    = async (assetId) => {
        let asset = null
        asset = await MediaLibrary.getAssetInfoAsync(assetId)
        return asset
    }

