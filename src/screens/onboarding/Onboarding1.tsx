import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import spacing from '../../constants/spacing'
import typography from '../../constants/typography'
import GradientButton from '../../components/ui/Button'
import { useNavigation } from '@react-navigation/native'
import { onboardingSteps } from '../../constants/onboarding/onboardingSteps'
import colors from '../../constants/color'

export default function Onboarding1() {
  const [currentStep, setcurrentStep] = useState<number>(0)
  const {title, description, imageSource} = onboardingSteps[currentStep]
  const navigation = useNavigation()

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setcurrentStep(currentStep + 1)
    } else {
      navigation.navigate('Onboarding2')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.skipContainer}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Image source={imageSource} resizeMode='contain' style={styles.image} />
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>

      <GradientButton text='Get Started' onPress={handleNext}/>
    

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.screenPadding,
    flex: 1,
    backgroundColor: colors.background
  },
  skipContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  skipText: {
    fontSize: typography.subtitle
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: spacing.jumbo
  },
  image: {
    height: spacing.screenWidth,
    width: '100%',
  },
  title: {
    textAlign: 'center',
    fontWeight: 700,
    fontSize: typography.title,
    marginBottom: spacing.sm
    // marginHorizontal: spacing.xlarge
  },
  description: {
    textAlign: 'center',
    fontSize: typography.body,
    marginBottom: spacing.sm
    // marginHorizontal: spacing.lg
  }

})