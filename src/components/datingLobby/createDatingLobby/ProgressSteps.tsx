import React, { useMemo } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  Dimensions,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Check } from 'lucide-react-native'
import colors from '../../../constants/color'
import spacing from '../../../constants/spacing'
import typography from '../../../constants/typography'

type ProgressStepsProps = {
  totalSteps?: number
  currentStep: number
  style?: ViewStyle
}


const CIRCLE_SIZE = spacing.xxl
const CONNECTOR_HEIGHT = spacing.xs

const ProgressSteps: React.FC<ProgressStepsProps> = ({
  totalSteps = 6,
  currentStep,
  style,
}) => {
  const steps = useMemo(() => Array.from({ length: totalSteps }, (_, i) => i + 1), [totalSteps])

  const connectorWidth = useMemo(() => {
    const totalConnectors = totalSteps - 1
    const totalCircleWidth = CIRCLE_SIZE * totalSteps
    const availableWidth = spacing.screenWidth - (spacing.xs * 10) - totalCircleWidth - spacing.screenPadding * 2
    return availableWidth / totalConnectors
  }, [totalSteps])

  return (
    <View style={[styles.container, style]}>
      {steps.map((step, index) => {
        const isCompleted = step < currentStep
        const isActive = step === currentStep
        const isLast = index === steps.length - 1

        return (
          <View key={step} style={styles.stepWrapper}>
            {isCompleted || isActive ? (
              <LinearGradient
                colors={colors.gradientPrimary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.circle}
              >
                {isCompleted ? (
                  <Check color={colors.textInverse} size={typography.subtitle} />
                ) : (
                  <Text style={styles.activeNumber}>{step}</Text>
                )}
              </LinearGradient>
            ) : (
              <View style={[styles.circle, styles.inactiveCircle]}>
                <Text style={styles.inactiveNumber}>{step}</Text>
              </View>
            )}

            {!isLast && (
              <View style={[styles.connectorWrapper, { width: connectorWidth,marginHorizontal: spacing.xs }]}>
                {isCompleted || isActive ? (
                  <LinearGradient
                    colors={colors.gradientPrimary}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.activeConnector}
                  />
                ) : (
                  <View style={styles.inactiveConnector} />
                )}
              </View>
            )}
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveCircle: {
    backgroundColor: colors.gray300,
  },
  activeNumber: {
    color: colors.textInverse,
    fontWeight: '800',
    fontSize: typography.body,
  },
  inactiveNumber: {
    color: colors.textInverse,
    fontWeight: '700',
    fontSize: typography.body,
    opacity: 0.7,
  },
  connectorWrapper: {
    height: CONNECTOR_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeConnector: {
    width: '100%',
    height: CONNECTOR_HEIGHT,
    borderRadius: CONNECTOR_HEIGHT / 2,
  },
  inactiveConnector: {
    width: '100%',
    height: spacing.xs,
    borderRadius: 1,
    backgroundColor: colors.gray300,
  },
})

export default ProgressSteps
