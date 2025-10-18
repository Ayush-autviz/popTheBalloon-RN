import React from 'react'
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import spacing from '../../constants/spacing'
import typography from '../../constants/typography'
import TextGradient from './TextGradient'
import colors from '../../constants/color'

type GradientLabelInputProps = TextInputProps & {
    label: string
    value: string
    onChangeText: (text: string) => void
}

const GradientInput: React.FC<GradientLabelInputProps> = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType,
    ...props
}) => {
    return (
        <LinearGradient
            colors={colors.gradientPrimary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBorder}
        >
            <View style={styles.innerContainer}>

                <TextGradient
                    style={styles.text}
                    locations={[0, 1]}
                    colors={['red','blue']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    text={label}
                />


                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder || `Enter ${label.toLowerCase()}`}
                    placeholderTextColor={colors.textSecondary}
                    keyboardType={keyboardType}
                    {...props}
                />
                </View>
            
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradientBorder: {
        borderRadius: 10,
       padding: 2,
        marginVertical: spacing.sm,
       
    //   height: 65,
       // marginHorizontal: spacing.sm,
    },
    innerContainer: {
        backgroundColor: '#fff',
        borderRadius: 9,
        marginRight: 4,
        marginBottom: 4,
    },
    text: {
        fontWeight: 600,
        fontSize: typography.body,
        marginTop: spacing.sm,
        marginLeft: spacing.sm
    },
    input: {
        fontSize: typography.body,
        fontWeight: '600',
        marginLeft: spacing.sm,
        padding:0,
        marginTop: spacing.xs,
        marginBottom: spacing.sm
    },
})

export default GradientInput
