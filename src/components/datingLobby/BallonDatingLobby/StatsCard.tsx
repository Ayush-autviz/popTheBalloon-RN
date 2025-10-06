import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import colors from '../../../constants/color';
import typography from '../../../constants/typography';
import spacing from '../../../constants/spacing';

export default function StatsCard() {
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../../assets/gradientBackground/Heart.png')}
          style={styles.background}
          resizeMode="cover"
        >
          <Text style={styles.title}>Matches Left</Text>
          <Text style={styles.data}>12</Text>
        </ImageBackground>

        <ImageBackground
          source={require('../../../assets/gradientBackground/User.png')}
          style={styles.background}
          resizeMode="cover"
        >
          <Text style={styles.title}>Time Left</Text>
          <Text style={styles.data}>00:30</Text>
        </ImageBackground>
      </View>
      
      <View style={styles.container}>
        <ImageBackground
          source={require('../../../assets/gradientBackground/Heart.png')}
          style={styles.background}
          resizeMode="cover"
        >
          <Text style={styles.title}>Interest left</Text>
          <Text style={styles.data}>2</Text>
        </ImageBackground>

        <ImageBackground
          source={require('../../../assets/gradientBackground/User.png')}
          style={styles.background}
          resizeMode="cover"
        >
          <Text style={styles.title}>Ballon Left</Text>
          <Text style={styles.data}>5</Text>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: spacing.md,
  },
  container: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  background: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  title: {
    color: colors.textInverse,
    fontSize: typography.small,
    fontWeight: '400',
    marginBottom: spacing.xs,
  },
  data: {
    color: colors.textInverse,
    fontSize: typography.title,
    fontWeight: '700',
  },
});