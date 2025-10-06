import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../constants/color';
import typography from '../../../constants/typography';
import spacing from '../../../constants/spacing';
import Button from '../../ui/Button';
import GradientProgressBar from '../../ui/ProgressBar';
import { Play, HelpCircle, HelpCircleIcon } from 'lucide-react-native';
import { HelpIcon } from '../../../constants/svg';
import { SvgXml } from 'react-native-svg';

export default function Questions() {
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.heading}>Questions</Text>
        <Button style={styles.askButton} text='+ Ask Question' />
      </View>

      <View style={styles.questionCard}>
        <LinearGradient
          colors={colors.gradientPrimary}
          style={styles.cardBorder}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
                <Text style={styles.progressText}>01/05</Text>
              <Text style={styles.timerText}>05:00</Text>
            </View>

            <GradientProgressBar 
                  progress={0.2} 
                  style={styles.progressBar}
                />

            <Text style={styles.questionText}>
              What's your favorite way to spend a weekend?
            </Text>

            <View style={styles.cardFooter}>

              <View style={styles.playButton}>
              <Button icon={<Play size={16} color={colors.background} fill={colors.background} />} style={{marginTop: 0, borderRadius: spacing.jumbo}} innerStyle={{paddingVertical: 0, paddingHorizontal: spacing.md}} />
              <Text style={styles.playText}>Play</Text>
              </View>

              <Button icon={<SvgXml xml={HelpIcon} height={14} width={14} />} style={{marginTop: 0, borderRadius: spacing.jumbo}} innerStyle={{paddingVertical: 0, paddingHorizontal: spacing.md}} />
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.xxl,
    backgroundColor: colors.backgroundSecondary,
    marginVertical: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  heading: {
    fontSize: typography.secondaryTitle,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: spacing.md,
  },
  askButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  askButtonTouchable: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  askButtonText: {
    color: colors.textInverse,
    fontSize: typography.body,
    fontWeight: '600',
  },
  questionCard: {
    marginBottom: spacing.lg,
  },
  cardBorder: {
    borderRadius: spacing.lg,
    padding: 2,
  },
  cardContent: {
    backgroundColor: colors.background,
    borderRadius: spacing.lg - 2,
    padding: spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    
  },
  progressText: {
    fontSize: typography.subtitle,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
  timerText: {
    fontSize: typography.subtitle,
    fontWeight: '600',
    color: colors.textPrimary,
    marginLeft: spacing.md,
  },
  questionText: {
    fontSize: typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  playButtonGradient: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  playText: {
    fontSize: typography.body,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  helpButton: {
  },
  helpButtonGradient: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
