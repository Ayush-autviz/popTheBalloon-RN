import React from 'react'
import { View, TextInput, StyleSheet, TextInputProps, StyleProp, ViewStyle, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import spacing from '../../constants/spacing'
import typography from '../../constants/typography'
import colors from '../../constants/color'
import { Heart, SearchIcon, Settings, SlidersHorizontal } from 'lucide-react-native'

type GradientSearchInputProps = TextInputProps & {
    value: string
    onChangeText: (text: string) => void
    placeholder?: string
    containerStyle?: StyleProp<ViewStyle>
}

const LobbySearch: React.FC<GradientSearchInputProps> = ({
    value,
    onChangeText,
    placeholder = 'Search',
    containerStyle,
    ...rest
}) => {
    return (
    <View style={styles.main}>
        <LinearGradient
            colors={colors.gradientPrimary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.gradientBorder, containerStyle]}
        >
            <View style={styles.Container}>
                <View style={styles.innerContainer}>
                    <SearchIcon color={colors.textSecondary} />
                    <TextInput
                        style={styles.input}
                        value={value}
                        onChangeText={onChangeText}
                        placeholder={placeholder}
                        placeholderTextColor={colors.textSecondary}
                        {...rest}
                    />
                </View>
                <SlidersHorizontal />
            </View>
        </LinearGradient>
        
        <TouchableOpacity style={styles.iconContainer}>
            <Heart />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.iconContainer}>
            <Settings />
        </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    main: {
      flexDirection: 'row',
      alignItems: 'center',
      gap:  5,
    },
    gradientBorder: {
        borderRadius: 10,
        padding: 1.5,
        marginVertical: spacing.sm,
        flex: 1
    },
    Container: {
        backgroundColor: '#fff',
        borderRadius: 9,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    innerContainer: {
        flexDirection: "row",
        gap: 10,
    },
    input: {
        fontSize: typography.body,
        fontWeight: '600',
        color: colors.textPrimary,
        padding: 0,
    },
    iconContainer: {
        paddingHorizontal: spacing.xs
    }
})

export default LobbySearch


