import React, { useEffect, useRef } from 'react'
import { Animated, Easing, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import colors from '../../constants/color'
import spacing from '../../constants/spacing'

type GradientSwitchProps = {
  value: boolean
  onValueChange: (next: boolean) => void
  disabled?: boolean
  style?: ViewStyle
  width?: number
  height?: number
}

const GradientSwitch: React.FC<GradientSwitchProps> = ({
  value,
  onValueChange,
  disabled = false,
  style,
  width = 52,
  height = 30,
}) => {
  const radius = height / 2
  const padding = spacing.xs
  const thumbSize = height - padding * 2
  const translateRange = width - height

  const anim = useRef(new Animated.Value(value ? 1 : 0)).current

  useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
      easing: Easing.out(Easing.quad),
    }).start()
  }, [value])

  const translateX = anim.interpolate({ inputRange: [0, 1], outputRange: [0, translateRange] })
  const handlePress = () => {
    if (disabled) return
    onValueChange(!value)
  }

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handlePress} disabled={disabled} style={[{ width, height, borderRadius: radius }, style]}>
      <Animated.View style={[styles.track, { borderRadius: radius, backgroundColor: colors.gray200 }]} />

      <Animated.View style={[StyleSheet.absoluteFill, { opacity: anim }]}> 
        <LinearGradient
          colors={colors.gradientPrimary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[StyleSheet.absoluteFill, { borderRadius: radius }]}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.thumb,
          {
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbSize / 2,
            transform: [{ translateX }],
            left: padding,
            top: padding,
            backgroundColor: '#fff',
          },
        ]}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  track: {
    ...StyleSheet.absoluteFillObject,
  },
  thumb: {
    position: 'absolute',
  },
})

export default GradientSwitch


