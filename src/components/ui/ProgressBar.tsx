import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import spacing from '../../constants/spacing';
import colors from '../../constants/color';

type GradientProgressBarProps = {
  progress: number;
  style?: StyleProp<ViewStyle>;
  height?: number;
  gradientColors?: string[];
};

const GradientProgressBar: React.FC<GradientProgressBarProps> = ({
  progress,
  style,
  height = spacing.sm,
  gradientColors = colors.gradientPrimary,
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 1); 

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.backgroundBar, { height, borderRadius: height / 2 }]}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.progressBar,
            {
              width: `${clampedProgress * 100}%`,
              height,
              borderRadius: height / 2,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  backgroundBar: {
    backgroundColor: '#F0F2F5',
    overflow: 'hidden',
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

export default GradientProgressBar;
