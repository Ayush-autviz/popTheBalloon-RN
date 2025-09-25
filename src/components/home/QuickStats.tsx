import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import spacing from '../../constants/spacing'
import typography from '../../constants/typography'
import colors from '../../constants/color'

export default function QuickStats() {
  return (
    <View style={styles.main}>
      <Text style={styles.heading}>Quick Stats</Text>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/gradientBackground/Heart.png')}
          style={styles.background}
        >
          <Text style={styles.title}>Matches</Text>
          <Text style={styles.data}>12</Text>
        </ImageBackground>

        <ImageBackground
          source={require('../../assets/gradientBackground/User.png')}
          style={styles.background}
        >
             <Text style={styles.title}>Active Lobbies</Text>
          <Text style={styles.data}>12</Text>
        </ImageBackground>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  main: {
    marginTop: spacing.large,
  },
  heading: {
    fontSize: typography.secondaryTitle,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  container: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  background: {
    flex: 1,
    backgroundColor: 'red',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
    borderRadius: 12,
    overflow: 'hidden',
  },
  title: {
    color: colors.background,
    fontSize: typography.subtitle
  },
  data: {
    color: colors.background,
    fontSize: typography.title,
    fontWeight: '600'
  }
})
