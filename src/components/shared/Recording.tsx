import React from 'react';
import { StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../constants/color';
import spacing from '../../constants/spacing';
import Button from '../ui/Button';
import { Play, Trash2 } from 'lucide-react-native';
import typography from '../../constants/typography';
import GradientProgressBar from '../ui/ProgressBar';
import { MicIcon } from '../../constants/svg';
import { SvgXml } from 'react-native-svg';

export default function Recording() {
  return (
      <LinearGradient
        colors={colors.gradientPrimary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBorder}
      >
        <View style={styles.innerContainer}>
          <Button style={styles.micButton} icon={<SvgXml xml={MicIcon} />} />

          <View style={styles.row}>
            <View style={styles.redDot} />
            <Text style={styles.time}>00:23</Text>
          </View>

          <Text style={{ color: colors.textSecondary }}>Record</Text>

          <View style={styles.row}>
            <Button variant="ghost" icon={<Play fill={colors.background} />} style={styles.playButton} />
            <GradientProgressBar progress={0.5} style={styles.progressBar} />
            <Text style={styles.progressText}>0:08 / 0:23</Text>
          </View>

          <View style={styles.deleteRow}>
            <Trash2 color={'#FD4539'} />
            <Text style={styles.deleteText}>Delete Recording</Text>
          </View>
        </View>
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBorder: {
    marginVertical: spacing.xl,
    borderRadius: 10,
    padding: 2,
  },
  innerContainer: {
    borderRadius: 9,
    backgroundColor: colors.background,
    padding: spacing.xxl,
    gap: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  time: {
    fontWeight: '700',
    fontSize: typography.subtitle,
  },
  micButton: {
    padding: spacing.sm,
    marginTop: 0,
    borderRadius: spacing.jumbo
  },
  playButton: {
    backgroundColor: '#000',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    borderRadius: spacing.jumbo,
  },
  progressBar: {
    alignSelf: 'stretch',
    flex: 1,
    marginTop: 30,
  },
  progressText: {
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  redDot: {
    height: spacing.sm,
    width: spacing.sm,
    backgroundColor: '#FD4539',
    borderRadius: spacing.jumbo,
  },
  deleteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  deleteText: {
    color: '#FD4539',
  },
});
