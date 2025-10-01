import React from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  Image,
  ActivityIndicator,
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
  innerStyle?: ViewStyle
  textStyle?: TextStyle
  variant?: 'gradient' | 'grey' | 'partner' | 'outline' | 'ghost'
  image?: ImageSourcePropType
  icon?: React.ReactNode
  rounded?: boolean
  loading?: boolean
  disabled?: boolean
  gradientText?: boolean
}

const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  style,
  innerStyle,
  textStyle,
  variant = 'gradient',
  image,
  icon,
  rounded = false,
  loading = false,
  disabled = false,
  gradientText = false,
}) => {
  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          color={variant === 'grey' ? colors.textPrimary : '#fff'}
          size={25}
        />
      )
    }

    return (
      <>
        {image && (
          <Image source={image} style={styles.image} resizeMode="contain" />
        )}
        {icon}
        {text &&
          (gradientText ? (
            <TextGradient
              style={[styles.gradientText, textStyle]}
              locations={[0, 1]}
              colors={colors.gradientPrimary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              text={text}
            />
          ) : (
            <Text
              style={[
                styles.text,
                variant === 'grey' && styles.greyText,
                (variant === 'ghost' || variant === 'outline') && styles.ghostText,
                textStyle,
              ]}
            >
              {text}
            </Text>
          ))}
      </>
    )
  }

  if (variant === 'gradient') {
    return (
      <LinearGradient
        colors={colors.gradientPrimary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.base, style]}
      >
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.8}
          disabled={disabled || loading}
          style={innerStyle}
        >
          {renderContent()}
        </TouchableOpacity>
      </LinearGradient>
    )
  }

  if (variant === 'partner' || variant === 'outline') {
    const partnerImage = require('../../assets/icons/partner.png')
    return (
      <LinearGradient
        colors={colors.gradientPrimary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.gradientBorder,
          icon ? { borderRadius: 28 } : null,
          rounded && { borderRadius: 30 },
          style,
        ]}
      >
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.8}
          disabled={disabled || loading}
          style={[
            styles.innerContainer,
            {
              backgroundColor: variant === 'outline' ? '#ffffff' : '#FEE9CB',
            },
            icon ? styles.icon : null,
            rounded && { borderRadius: 29, paddingVertical: 5 },
            innerStyle
          ]}
        >
          {variant === 'partner' && !image && (
            <Image
              source={partnerImage}
              style={styles.image}
              resizeMode="contain"
            />
          )}
          {renderContent()}
        </TouchableOpacity>
      </LinearGradient>
    )
  }

  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles.greyButton,
        variant === 'ghost' && styles.ghostButton,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
    >
      {renderContent()}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.md,
    borderRadius: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    flexDirection: 'row',
    gap: 5,
  },
  gradientText: {
    fontSize: typography.subtitle,
    fontWeight: '600',
  },
  greyButton: {
    backgroundColor: '#F0F2F5',
    borderColor: colors.border,
    borderWidth: 1,
  },
  ghostButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
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
    fontWeight: '400',
  },
  image: {
    width: spacing.xxl,
    aspectRatio: 1,
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
    justifyContent: 'center',
  },
  icon: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderRadius: 28,
  },
})

export default Button











// import React from 'react'
// import {
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ViewStyle,
//   TextStyle,
//   ImageSourcePropType,
//   Image,
//   ActivityIndicator,
// } from 'react-native'
// import LinearGradient from 'react-native-linear-gradient'
// import spacing from '../../constants/spacing'
// import typography from '../../constants/typography'
// import colors from '../../constants/color'
// import TextGradient from './TextGradient'

// type ButtonProps = {
//   text?: string
//   onPress?: () => void
//   style?: ViewStyle
//   textStyle?: TextStyle
//   variant?: 'gradient' | 'grey' | 'partner' | 'outline' | 'ghost'
//   image?: ImageSourcePropType
//   icon?: React.ReactNode
//   rounded?: boolean
//   loading?: boolean
//   disabled?: boolean
// }

// const Button: React.FC<ButtonProps> = ({
//   text,
//   onPress,
//   style,
//   textStyle,
//   variant = 'gradient',
//   image,
//   icon,
//   rounded = false,
//   loading = false,
//   disabled = false,
// }) => {
//   const renderContent = () => (
//     <>
//       {image && (
//         <Image source={image} style={styles.image} resizeMode="contain" />
//       )}
//       {icon}
//       {loading ? (
//         <ActivityIndicator color={variant === 'grey' ? colors.textPrimary : '#fff'} />
//       ) : text ? (
//         variant === 'partner' ? (
//           <TextGradient
//             style={[styles.gradientText, textStyle]}
//             locations={[0, 1]}
//             colors={colors.gradientPrimary}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//             text={text}
//           />
//         ) : (
//           <Text
//             style={[
//               styles.text,
//               variant === 'grey' ? styles.greyText : styles.ghostText,
//               textStyle,
//             ]}
//           >
//             {text}
//           </Text>
//         )
//       ) : null}
//     </>
//   )

//   if (variant === 'gradient') {
//     return (
//       <LinearGradient
//         colors={colors.gradientPrimary}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//         style={[styles.base, style]}
//       >
//         <TouchableOpacity
//           onPress={onPress}
//           activeOpacity={0.8}
//           disabled={disabled || loading}
//         >
//           {renderContent()}
//         </TouchableOpacity>
//       </LinearGradient>
//     )
//   }

//   if (variant === 'partner' || variant === 'outline') {
//     const partnerImage = require('../../assets/icons/partner.png')
//     return (
//       <LinearGradient
//         colors={colors.gradientPrimary}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//         style={[
//           styles.gradientBorder,
//           icon ? { borderRadius: 28 } : null,
//           rounded && { borderRadius: 30 },
//           style,
//         ]}
//       >
//         <TouchableOpacity
//           onPress={onPress}
//           activeOpacity={0.8}
//           disabled={disabled || loading}
//           style={[
//             styles.innerContainer,
//             {
//               backgroundColor:
//                 variant === 'outline' ? '#ffffff' : '#FEE9CB',
//             },
//             icon ? styles.icon : null,
//             rounded && { borderRadius: 29, paddingVertical: 5 },
//           ]}
//         >
//           {variant === 'partner' && !image && (
//             <Image
//               source={partnerImage}
//               style={styles.image}
//               resizeMode="contain"
//             />
//           )}
//           {renderContent()}
//         </TouchableOpacity>
//       </LinearGradient>
//     )
//   }
//   return (
//     <TouchableOpacity
//       style={[
//         styles.base,
//         styles.greyButton,
//         variant === 'ghost' && styles.ghostButton,
//         style,
//       ]}
//       onPress={onPress}
//       activeOpacity={0.8}
//       disabled={disabled || loading}
//     >
//       {renderContent()}
//     </TouchableOpacity>
//   )
// }

// const styles = StyleSheet.create({
//   base: {
//     paddingVertical: spacing.md,
//     borderRadius: spacing.md,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: spacing.md,
//     flexDirection: 'row',
//     gap: 5,
//   },
//   gradientText: {
//     fontSize: typography.subtitle,
//     fontWeight: '600',
//   },
//   greyButton: {
//     backgroundColor: '#F0F2F5',
//     borderColor: colors.border,
//     borderWidth: 1,
//   },
//   ghostButton: {
//     backgroundColor: 'transparent',
//     borderWidth: 0,
//   },
//   text: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: typography.subtitle,
//   },
//   greyText: {
//     color: colors.textPrimary,
//   },
//   ghostText: {
//     color: colors.textPrimary,
//     fontWeight: '400',
//   },
//   image: {
//     width: spacing.xxl,
//     aspectRatio: 1,
//   },
//   gradientBorder: {
//     borderRadius: 10,
//     padding: 1,
//     marginVertical: spacing.sm,
//     zIndex: 1000,
//   },
//   innerContainer: {
//     borderRadius: 9,
//     paddingVertical: spacing.md,
//     alignItems: 'center',
//     flexDirection: 'row',
//     gap: 5,
//     justifyContent: 'center',
//   },
//   icon: {
//     paddingHorizontal: spacing.lg,
//     paddingVertical: spacing.lg,
//     borderRadius: 28,
//   },
// })

// export default Button






