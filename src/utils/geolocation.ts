import Geolocation from 'react-native-geolocation-service'
import { Platform, PermissionsAndroid } from 'react-native'

export type Coordinates = {
  latitude: number
  longitude: number
  accuracy?: number
}

export type LocationResult = {
  success: boolean
  coordinates?: Coordinates
  error?: string
}

export type PermissionErrorType = 'permission_denied' | 'never_ask_again' | 'service_disabled' | 'timeout' | 'unavailable' | 'unknown'

export type PermissionError = {
  type: PermissionErrorType
  message: string
}

/**
 * Checks if location permission is already granted
 * @returns Promise<boolean> - Whether permission is already granted
 */
export const checkLocationPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'android') {
      // Android: Use PermissionsAndroid.check for direct permission check
      const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      console.log('Android location permission status:', granted ? 'granted' : 'denied')
      return granted
    } else {
      // iOS: Use Geolocation.getCurrentPosition to check if permission is granted
      return new Promise((resolve) => {
        Geolocation.getCurrentPosition(
          () => {
            console.log('iOS location permission status: granted')
            resolve(true)
          },
          (error) => {
            console.log('iOS location permission status: denied -', error.message)
            resolve(false)
          },
          {
            enableHighAccuracy: false,
            timeout: 1000,
            maximumAge: 0,
          }
        )
      })
    }
  } catch (err) {
    console.error('Error checking location permission:', err)
    return false
  }
}

/**
 * Requests location permission using platform-specific APIs
 * @returns Promise<boolean> - Whether permission was granted
 */
const requestLocationPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'ios') {
      // iOS: Use Geolocation.requestAuthorization for native prompt with "While Using App"
      const result = await Geolocation.requestAuthorization('whenInUse')
      console.log('iOS location permission result:', result)
      const isGranted = result === 'granted'
      console.log('iOS location permission granted:', isGranted)
      return isGranted
    } else {
      // Android: Use PermissionsAndroid.request for native prompt
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location to provide location-based features.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      )
      
      const isGranted = granted === PermissionsAndroid.RESULTS.GRANTED
      console.log('Android location permission result:', granted, 'Granted:', isGranted)
      
      // Handle "never_ask_again" case
      if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        console.log('User selected "Never ask again" - permission permanently denied')
        return false
      }
      
      return isGranted
    }
  } catch (err) {
    console.error('Location permission request failed:', err)
    return false
  }
}

/**
 * Gets current user coordinates
 * @returns Promise<LocationResult> - Object containing location data or error
 */
export const getCurrentLocation = async (): Promise<LocationResult> => {
  try {
    // Request permission first
    const hasPermission = await requestLocationPermission()
    if (!hasPermission) {
      return {
        success: false,
        error: 'Location permission denied'
      }
    }

    return new Promise((resolve) => {
      Geolocation.getCurrentPosition(
        (position) => {
          const coordinates: Coordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          }
          
          console.log('Current location:', coordinates)
          resolve({
            success: true,
            coordinates
          })
        },
        (error) => {
          console.error('Location error:', error)
          let errorMessage = 'Failed to get location'
          
          switch (error.code) {
            case 1:
              errorMessage = 'Location permission denied'
              break
            case 2:
              errorMessage = 'Location unavailable'
              break
            case 3:
              errorMessage = 'Location request timeout'
              break
            default:
              errorMessage = error.message || 'Unknown location error'
          }
          
          resolve({
            success: false,
            error: errorMessage
          })
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000
        }
      )
    })
  } catch (err) {
    console.error('Location service error:', err)
    const errorMessage = err instanceof Error ? err.message : String(err)
    return {
      success: false,
      error: `Location service error: ${errorMessage}`
    }
  }
}


/**
 * Handles location permission and service status
 * @returns Promise<{hasPermission: boolean, error?: PermissionError}>
 */
export const handleLocationPermission = async (): Promise<{hasPermission: boolean, error?: PermissionError}> => {
  try {
    // Check if permission is already granted
    const hasPermission = await checkLocationPermission()
    if (hasPermission) {
      return { hasPermission: true }
    }

    // Request permission
    const granted = await requestLocationPermission()
    if (granted) {
      return { hasPermission: true }
    }

    // Check if it's "never_ask_again" case
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to provide location-based features.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        )
        
        if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          return { 
            hasPermission: false, 
            error: {
              type: 'never_ask_again',
              message: 'Location permission was permanently denied. Please enable it manually in device settings.'
            }
          }
        }
      } catch (err) {
        // Fall through to default error
      }
    }

    return { 
      hasPermission: false, 
      error: {
        type: 'permission_denied',
        message: 'Location permission denied'
      }
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err)
    return { 
      hasPermission: false, 
      error: {
        type: 'unknown',
        message: `Permission error: ${errorMessage}`
      }
    }
  }
}

/**
 * Gets location with enhanced error handling
 * @returns Promise<{success: boolean, coordinates?: Coordinates, error?: PermissionError}>
 */
export const getLocationWithErrorHandling = async (): Promise<{success: boolean, coordinates?: Coordinates, error?: PermissionError}> => {
  try {
    const locationResult = await getCurrentLocation()
    
    if (locationResult.success && locationResult.coordinates) {
      return {
        success: true,
        coordinates: locationResult.coordinates
      }
    }

    // Determine error type based on error message
    let errorType: PermissionErrorType = 'unknown'
    if (locationResult.error?.includes('permission')) {
      errorType = 'permission_denied'
    } else if (locationResult.error?.includes('unavailable')) {
      errorType = 'service_disabled'
    } else if (locationResult.error?.includes('timeout')) {
      errorType = 'timeout'
    }

    return {
      success: false,
      error: {
        type: errorType,
        message: locationResult.error || 'Unknown location error'
      }
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err)
    return {
      success: false,
      error: {
        type: 'unknown',
        message: errorMessage
      }
    }
  }
}