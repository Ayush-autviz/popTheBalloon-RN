import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import spacing from '../../constants/spacing';
import typography from '../../constants/typography';
import colors from '../../constants/color';
import TextGradient from './TextGradient';

type GradientLabelInputProps = TextInputProps & {
  variant?: 'gradient' | 'default';
  label?: string;
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  containerStyle?: ViewStyle;
  height?: number;
};

const TextArea: React.FC<GradientLabelInputProps> = ({
  variant = 'default',
  label,
  value,
  placeholder,
  onChangeText,
  containerStyle,
  height = 120,
  ...props
}) => {
  if (variant === 'gradient') {
    return (
      <LinearGradient
        colors={['#B02D9F', '#DE6F41']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradientBorder, containerStyle]}
      >
        <View style={[styles.innerContainer]}>
          {label &&

            <TextGradient
              style={styles.text}
              locations={[0, 1]}
              colors={['red', 'blue']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              text={label}
            />
          }
          <TextInput
            style={[styles.input, { height }]}
            value={value}
            onChangeText={onChangeText}
            multiline
            textAlignVertical="top"
            {...props}
          />
        </View>
      </LinearGradient>
    );
  }

  return (
    <TextInput
      style={[styles.input, styles.defaultBorder, { height }, containerStyle]}
      value={value}
      placeholder={placeholder ?? ''}
      placeholderTextColor={colors.textSecondary}
      onChangeText={onChangeText}
      multiline
      textAlignVertical="top"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  gradientBorder: {
    borderRadius: 10,
    padding: 1.5,
    marginVertical: spacing.md,
  },
  innerContainer: {
    backgroundColor: '#fff',
    borderRadius: 9,
  },
  defaultBorder: {
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    padding: 1.5,
    backgroundColor: '#fff',
    marginVertical: spacing.md
  },
  input: {
    fontSize: typography.body,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    color: colors.textPrimary,
  },
  text: {
    fontWeight: 600,
    fontSize: typography.body,
    marginTop: spacing.sm,
    marginLeft: spacing.sm
},
});

export default TextArea;
