import React from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
  ImageSourcePropType,
  Image,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import spacing from '../../constants/spacing'
import typography from '../../constants/typography'
import colors from '../../constants/color'
import TextGradient from './TextGradient'

type ButtonProps = {
  text?: string
  onPress?: () => void
  style?: ViewStyle
  textStyle?: TextStyle
  variant?: 'gradient' | 'grey' | 'partner' | 'outline' | 'ghost'
  icon?: ImageSourcePropType
}

const Button: React.FC<ButtonProps> = ({
  text = 'Become Partners',
  onPress,
  style,
  textStyle,
  variant = 'gradient',
  icon
}) => {

  if (variant === 'grey' || variant === 'ghost') {
    return (
      <TouchableOpacity style={[styles.greyButton, styles.base, style, variant === 'ghost' && styles.ghostButton]} onPress={onPress} activeOpacity={0.8}>
        {icon &&
          <Image source={icon} style={styles.image} resizeMode='contain' />
        }
        <Text
          style={[
            styles.text,
            variant === 'grey' ? styles.greyText : styles.ghostText,
            textStyle,
          ]}
        >
          {text}
        </Text>
      </TouchableOpacity>
    )
  }

  if (variant === 'gradient') {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <LinearGradient
          colors={colors.gradientPrimary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.base, style]}
        >
          <Text style={[styles.text, textStyle]}>{text}</Text>
        </LinearGradient>
      </TouchableOpacity>
    )
  }

  if (variant === 'partner' || variant === 'outline') {
    const partnerImage = require('../../assets/icons/partner.png')
    return (
      <LinearGradient
        colors={colors.gradientPrimary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradientBorder, style]}
      >
        <TouchableOpacity onPress={onPress} style={[styles.innerContainer, { backgroundColor: variant === 'outline' ? '#ffffff' : '#FEE9CB' }]}>
          <Image source={variant === 'partner' ? partnerImage : icon} style={styles.image} resizeMode='contain' />
          <TextGradient
            style={styles.gradientText}
            locations={[0, 1]}
            colors={colors.gradientPrimary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            text={text}
          />
        </TouchableOpacity>
      </LinearGradient>
    )
  }

}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.md,
    borderRadius: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    flexDirection: 'row',
    gap: 5
  },
  gradientText: {
    fontSize: typography.subtitle,
    fontWeight: '600'
  },
  greyButton: {
    backgroundColor: '#F0F2F5',
    borderColor: colors.border,
    borderWidth: 1
  },
  ghostButton: {
    backgroundColor: 'transparent',
    borderWidth: 0
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: typography.subtitle,
  },
  greyText: {
    color: colors.textPrimary,
  },
  ghostText: {
    color: colors.textPrimary,
    fontWeight: '400'
  },
  image: {
    width: spacing.xl,
    aspectRatio: 1
  },
  gradientBorder: {
    borderRadius: 10,
    padding: 1,
    marginVertical: spacing.sm,
    zIndex: 1000,
  },
  innerContainer: {
    borderRadius: 9,
    paddingVertical: spacing.md,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center'
  },
})

export default Button
