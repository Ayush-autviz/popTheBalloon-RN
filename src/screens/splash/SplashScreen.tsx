import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useAuthStore } from '../../store/authStore'

export default function SplashScreen(): React.ReactElement {
  const navigation = useNavigation<any>()
  const { isAuthenticated, onboardingCompleted, userPref } = useAuthStore()

  useEffect(() => {
    // Show splash screen for 2 seconds, then navigate based on user state
    const timer = setTimeout(() => {
      if (isAuthenticated && userPref) {
        // User is authenticated, check registration status
        if (!userPref.registrationCompleted) {
          // Registration completed, go to main app
          navigation.replace('App')
        } else {
          // Registration not completed, navigate to appropriate step
          switch (userPref.registrationStep) {
            case 1:
              navigation.replace('Auth', { screen: 'Verification' })
              break
            case 2:
              navigation.replace('Auth', { screen: 'UserDetails' })
              break
            case 3:
              navigation.replace('Auth', { screen: 'AddPhotos' })
              break
            case 4:
              navigation.replace('Auth', { screen: 'AboutYourself' })
              break
            default:
              navigation.replace('Auth', { screen: 'Verification' })
          }
        }
      } else if (onboardingCompleted) {
        // User completed onboarding but not authenticated, go to auth
        navigation.replace('Auth')
      } else {
        // User hasn't completed onboarding, show onboarding first
        navigation.replace('Onboarding')
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [isAuthenticated, onboardingCompleted, userPref, navigation])

  return (
    <View>
     <Image source={require('../../assets/images/SplashImage.png')} style={styles.image} resizeMode='cover'/>
    </View>
  )
}

const styles  = StyleSheet.create({
    image: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    }
})