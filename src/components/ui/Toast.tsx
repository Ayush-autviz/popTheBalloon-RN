import React, { useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import spacing from '../../constants/spacing'
import typography from '../../constants/typography'
import colors from '../../constants/color'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export type ToastConfig = {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
  onPress?: () => void
}

type ToastProps = {
  toast: ToastConfig
  onHide: (id: string) => void
}

const Toast: React.FC<ToastProps> = ({ toast, onHide }) => {
  const slideAnim = new Animated.Value(-100)
  const opacityAnim = new Animated.Value(0)

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()

    const timer = setTimeout(() => {
      hideToast()
    }, toast.duration || 4000)

    return () => clearTimeout(timer)
  }, [])

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide(toast.id)
    })
  }

  const getToastColors = () => {
    switch (toast.type) {
      case 'success':
        return {
          background: colors.success,
          gradient: [colors.success, '#2ECC71'],
        }
      case 'error':
        return {
          background: colors.error,
          gradient: [colors.error, '#E74C3C'],
        }
      case 'warning':
        return {
          background: colors.warning,
          gradient: [colors.warning, '#F39C12'],
        }
      case 'info':
        return {
          background: colors.info,
          gradient: [colors.info, '#3498DB'],
        }
      default:
        return {
          background: colors.primary,
          gradient: colors.gradientPrimary,
        }
    }
  }

  const toastColors = getToastColors()

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          toast.onPress?.()
          hideToast()
        }}
        activeOpacity={0.8}
        style={styles.touchable}
      >
        <LinearGradient
          colors={toastColors.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientContainer}
        >
          <View style={styles.content}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{toast.title}</Text>
              {toast.message && (
                <Text style={styles.message}>{toast.message}</Text>
              )}
            </View>
            <TouchableOpacity
              onPress={hideToast}
              style={styles.closeButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  touchable: {
    marginHorizontal: spacing.screenPadding,
    marginTop: spacing.lg,
  },
  gradientContainer: {
    borderRadius: spacing.md,
    shadowColor: colors.gray900,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  icon: {
    color: colors.textInverse,
    fontSize: typography.subtitle,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: colors.textInverse,
    fontSize: typography.subtitle,
    fontWeight: '600',
    marginBottom: 2,
  },
  message: {
    color: colors.textInverse,
    fontSize: typography.small,
    opacity: 0.9,
    lineHeight: 18,
  },
  closeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  closeIcon: {
    color: colors.textInverse,
    fontSize: typography.small,
    fontWeight: 'bold',
  },
})

export default Toast
