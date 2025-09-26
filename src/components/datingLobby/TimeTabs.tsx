import React, { useMemo, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import colors from '../../constants/color'
import spacing from '../../constants/spacing'
import typography from '../../constants/typography'
import TextGradient from '../ui/TextGradient'

type TimeTab = {
    label: string
    value: string
    count?: number
}

type TimeTabsProps = {
    tabs?: TimeTab[]
    value?: string
    onChange?: (value: string) => void
    style?: StyleProp<ViewStyle>
}

const DEFAULT_TABS: TimeTab[] = [
    { label: 'Now', value: 'now', count: 25 },
    { label: '1hr', value: '1h' },
    { label: '2hr', value: '2h' },
    { label: '3hr', value: '3h' },
    { label: '4hr', value: '4h' },
    { label: '5hr', value: '5h' },
]

const TimeTabs: React.FC<TimeTabsProps> = ({ tabs = DEFAULT_TABS, value, onChange, style }) => {
    const [internalValue, setInternalValue] = useState<string>(tabs[0]?.value)
    const activeValue = value ?? internalValue

    const handlePress = (next: string) => {
        if (onChange) onChange(next)
        else setInternalValue(next)
    }

    const items = useMemo(() => tabs, [tabs])

    return (
        <View style={[styles.container, style]}>            
            {items.map((tab) => {
                const isActive = tab.value === activeValue
                const labelText = tab.count != null && tab.label.toLowerCase() === 'now'
                    ? `${tab.label} (${tab.count})`
                    : tab.label
                return (
                    <TouchableOpacity
                        key={tab.value}
                        onPress={() => handlePress(tab.value)}
                        activeOpacity={0.8}
                        style={styles.tabItem}
                    >
                        {isActive ? (
                            <TextGradient
                                text={labelText}
                                colors={colors.gradientPrimary}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.activeLabel}
                            />
                        ) : (
                            <Text style={styles.label}>{labelText}</Text>
                        )}

                        {isActive ? (
                            <LinearGradient
                                colors={colors.gradientPrimary}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.activeUnderline}
                            />
                        ) : (
                            <View style={styles.inactiveUnderline} />
                        )}
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.xs,
        marginTop: spacing.xxl
    },
    tabItem: {
        alignItems: 'center',
    },
    label: {
        fontSize: typography.body,
        color: colors.textSecondary,
        fontWeight: '700',
    },
    activeLabel: {
        fontSize: typography.body,
        fontWeight: '800',
    },
    activeUnderline: {
        height: 4,
        borderRadius: 4,
        width: spacing.xxxl,
        marginTop: spacing.xs,
    },
    inactiveUnderline: {
        height: 2,
        borderRadius: 2,
        width: 32,
        marginTop: spacing.xs,
        backgroundColor: colors.gray200,
        opacity: 0.8,
    },
})

export default TimeTabs


