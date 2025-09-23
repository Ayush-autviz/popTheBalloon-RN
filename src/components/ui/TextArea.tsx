// import React from 'react'
// import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native'
// import LinearGradient from 'react-native-linear-gradient'
// import spacing from '../../constants/spacing'
// import typography from '../../constants/typography'
// import TextGradient from './TextGradient'
// import colors from '../../constants/color'

// type GradientLabelInputProps = TextInputProps & {
//     variant?: 'gradient' | 'default'
//     value: string
//     onChangeText: (text: string) => void
// }

// const TextArea: React.FC<GradientLabelInputProps> = ({
//     variant= 'default',
//     value,
//     onChangeText,
// }) => {
//     if (variant === 'gradient') {
//         return (
//             <LinearGradient
//                 colors={['#B02D9F', '#DE6F41']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={styles.gradientBorder}
//             >
//                 <View style={styles.innerContainer}>

//                     <TextInput
//                         style={styles.input}
//                         value={value}
//                         onChangeText={onChangeText}
//                         multiline
//                         numberOfLines={10}
//                         textAlignVertical='top'
//                     />
//                 </View>

//             </LinearGradient>
//         )
//     }

//     else {
//         return (
//             <TextInput
//                 style={[styles.input, styles.defaultBorder]}
//                 value={value}
//                 onChangeText={onChangeText}
//                 multiline
//                 numberOfLines={3}
//                 textAlignVertical='top'
//             />
//         )
//     }
// }

// const styles = StyleSheet.create({
//     gradientBorder: {
//         borderRadius: 10,
//         padding: 1.5,
//         marginVertical: spacing.sm,
//     },
//     defaultBorder: {
//         borderColor: colors.border,
//         borderWidth: 1,
//         borderRadius: 10,
//         padding: 1.5,
//     },
//     innerContainer: {
//         backgroundColor: '#fff',
//         borderRadius: 9,
//     },
//     text: {
//         fontWeight: 600,
//         fontSize: typography.body,
//         marginTop: spacing.sm,
//         marginLeft: spacing.sm
//     },
//     input: {
//         fontSize: typography.body,
//         fontWeight: '700',
//         marginLeft: spacing.sm,
//         padding: 0,
//         marginTop: spacing.xs,
//         marginBottom: spacing.sm
//     },
// })

// export default TextArea



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

type GradientLabelInputProps = TextInputProps & {
  variant?: 'gradient' | 'default';
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  containerStyle?: ViewStyle;
  height?: number;
};

const TextArea: React.FC<GradientLabelInputProps> = ({
  variant = 'default',
  value,
  placeholder,
  onChangeText,
  containerStyle,
  height = 120, // Default height (can be overridden)
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
});

export default TextArea;
