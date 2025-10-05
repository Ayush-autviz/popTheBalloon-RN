import { launchCamera, launchImageLibrary, Asset, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker'

export type PickedImage = Readonly<{ uri: string; width?: number; height?: number; fileName?: string; type?: string }>

const libOptions: ImageLibraryOptions = { mediaType: 'photo', selectionLimit: 1, quality: 0.8 }
const camOptions: CameraOptions = { mediaType: 'photo', cameraType: 'back', quality: 0.8, saveToPhotos: true }

function toPicked(asset?: Asset): PickedImage | null {
  if (!asset?.uri) return null
  return { uri: asset.uri, width: asset.width, height: asset.height, fileName: asset.fileName, type: asset.type }
}

export async function pickFromGallery(): Promise<PickedImage | null> {
  const res = await launchImageLibrary(libOptions)
  if (res.didCancel || res.errorCode) return null
  return toPicked(res.assets?.[0])
}

export async function captureFromCamera(): Promise<PickedImage | null> {
  const res = await launchCamera(camOptions)
  if (res.didCancel || res.errorCode) return null
  return toPicked(res.assets?.[0])
}

