import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import colors from '../../constants/color'
import spacing from '../../constants/spacing'
import typography from '../../constants/typography'
import Button from '../ui/Button'

export interface MatchViewProps {
  primaryUserImage: ImageSourcePropType
  secondaryUserImage: ImageSourcePropType
  onStartChat?: () => void
}

const MatchView: React.FC<MatchViewProps> = ({ primaryUserImage, secondaryUserImage, onStartChat }) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardStack}>
        <View style={[styles.card, styles.cardBack]}>
          <Image source={secondaryUserImage} resizeMode='contain' style={styles.cardImage} />
          <View style={styles.badge}>
            <LinearGradient colors={colors.gradientPrimary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.badgeGradient}>
              <View style={styles.badgeInner} />
            </LinearGradient>
          </View>
        </View>

        <View style={[styles.card, styles.cardFront]}>
          <Image source={primaryUserImage} resizeMode='contain' style={styles.cardImage} />
          <View style={styles.badge}>
            <LinearGradient colors={colors.gradientPrimary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.badgeGradient}>
              <View style={styles.badgeInner} />
            </LinearGradient>
          </View>
        </View>
      </View>

      {/* <Text style={styles.congrats}>Congratulations!</Text>
      <Text style={styles.subtitle}>It's a Match!</Text>

      <Button text='Start Chat' onPress={onStartChat} /> */}
    </View>
  )
}

const CARD_SIZE = 190
const BADGE_SIZE = 34

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // padding: spacing.xl,
    // backgroundColor: colors.background,/
  },
  cardStack: {
    width: '100%',
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: spacing.lg,
  },
  cardBack: {
    position: 'absolute',
    transform: [{ rotate: '12deg' }],
    right: spacing.large,
    // top: spacing.jumbo,
  },
  cardFront: {
    position: 'absolute',
    transform: [{ rotate: '-12deg' }],
    left: spacing.large,
    top: spacing.jumbo,
  },
  cardImage: {
    width: '100%',
    height: 400,
  },
  badge: {
    position: 'absolute',
    bottom: spacing.sm,
    left: spacing.sm,
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: BADGE_SIZE / 2,
    overflow: 'hidden',
  },
  badgeGradient: {
    flex: 1,
    borderRadius: BADGE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeInner: {
    width: BADGE_SIZE / 2,
    height: BADGE_SIZE / 2,
    borderRadius: BADGE_SIZE / 4,
    backgroundColor: '#fff',
  },
  congrats: {
    fontSize: typography.headline,
    fontWeight: '700',
    color: colors.textTertiary,
    marginTop: spacing.xl,
  },
  subtitle: {
    fontSize: typography.secondaryTitle,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
})

export default MatchView


