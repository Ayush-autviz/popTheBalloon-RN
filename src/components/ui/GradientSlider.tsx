import React from 'react'
import { View, StyleSheet } from 'react-native'
import Slider from '@react-native-community/slider'
import LinearGradient from 'react-native-linear-gradient'
import colors from '../../constants/color'
import spacing from '../../constants/spacing'

type GradientSliderProps = {
  value: number
  onValueChange: (value: number) => void
}

export default function GradientSlider({ value, onValueChange }: GradientSliderProps) {

  return (
    <View style={styles.container}>

      <View style={styles.trackWrapper}>
        
        <View style={styles.backgroundTrack} />

        
        <View style={[styles.progressWrapper, { width: `${value}%` }]}> 
          <LinearGradient
            colors={colors.gradientPrimary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientTrack}
          />
        </View>

        
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={value}
          onValueChange={onValueChange}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          thumbTintColor="transparent"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.lg
  },
  trackWrapper: {
    height: 6,
    justifyContent: 'center',
    borderRadius: spacing.large,
    overflow: 'hidden',
  },
  backgroundTrack: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.gray200,
    borderRadius: spacing.large,
  },
  progressWrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: spacing.large,
    overflow: 'hidden',
  },
  gradientTrack: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: spacing.large,
  },
  slider: {
    height: spacing.xlarge,
    // Makes the slider capture gestures without showing default UI
    backgroundColor: 'transparent',
  },
})
