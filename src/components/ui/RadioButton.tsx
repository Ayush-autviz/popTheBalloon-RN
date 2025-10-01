import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import colors from '../../constants/color'
import spacing from '../../constants/spacing'
import typography from '../../constants/typography'

type GradientRadioProps = {
  label: string
  selected: boolean
  onPress: () => void
  containerStyle?: ViewStyle
  labelStyle?: TextStyle
}

const GradientRadio: React.FC<GradientRadioProps> = ({
  label,
  selected,
  onPress,
  containerStyle,
  labelStyle,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.row, containerStyle]}>
      {/* Gradient Border */}
      <LinearGradient
        colors={colors.gradientPrimary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.radioOuterGradient}
      >
        <View style={styles.radioOuter}>
          {selected && <View style={styles.radioInner} />}
        </View>
      </LinearGradient>

      {/* Label */}
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  radioOuterGradient: {
    width: spacing.xl,
    height: spacing.xl,
    borderRadius: 12,
    padding: 2,
  },
  radioOuter: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: spacing.md,
    height: spacing.md,
    borderRadius: 6,
    backgroundColor: colors.textTertiary,
  },
  label: {
    fontSize: typography.body,
    color: colors.textSecondary,
    width: '90%',
    lineHeight: spacing.xl,
    marginTop: spacing.md
  },
})

export default GradientRadio
