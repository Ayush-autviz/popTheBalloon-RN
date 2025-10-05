import { Platform, PermissionsAndroid, Alert } from 'react-native'

export type PermissionResult = {
  granted: boolean
  error?: string
}

/**
 * Requests microphone permission for audio recording
 * @returns Promise<PermissionResult> - Object containing permission status
 */
export const requestMicrophonePermission = async (): Promise<PermissionResult> => {
  if (Platform.OS === 'android') {
    try {
      // Check if permission is already granted
      const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO)
      if (hasPermission) {
        console.log('Microphone permission already granted')
        return { granted: true }
      }

      console.log('Requesting microphone permission...')
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Audio Recording Permission',
          message: 'This app needs access to your microphone to record audio.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      )
      
      console.log('Permission result:', granted)
      const isGranted = granted === PermissionsAndroid.RESULTS.GRANTED
      console.log('Permission granted:', isGranted)
      
      return { granted: isGranted }
    } catch (err) {
      console.error('Permission request failed:', err)
      const errorMessage = err instanceof Error ? err.message : String(err)
      return { 
        granted: false, 
        error: `Failed to request microphone permission: ${errorMessage}` 
      }
    }
  }
  
  // For iOS, permissions are handled by Info.plist
  // The system will show the permission dialog automatically
  console.log('iOS: Microphone permission handled by Info.plist')
  return { granted: true }
}

/**
 * Shows permission denied alert with options
 */
export const showPermissionDeniedAlert = (): void => {
  Alert.alert(
    'Permission Required', 
    'Microphone access is required to record audio. Please grant permission in your device settings.',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open Settings', onPress: () => {
        // You can add Linking.openSettings() here if needed
        console.log('User should open settings manually')
      }}
    ]
  )
}