import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import spacing from '../../constants/spacing'
import colors from '../../constants/color'
import TextGradient from '../ui/TextGradient'
import typography from '../../constants/typography'
import { Check } from 'lucide-react-native'

export default function PartnerCard() {
    return (
        <LinearGradient
            colors={colors.gradientPrimary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBorder}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.heading}>Become Partners</Text>
                <View style={styles.priceContainer}>
                    <TextGradient
                        style={styles.price}
                        locations={[0, 1]}
                        colors={colors.gradientPrimary}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        text='$29.99'
                    />
                    <TextGradient
                        style={styles.month}
                        locations={[0, 1]}
                        colors={colors.gradientPrimary}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        text=' /month'
                    />
                </View>

                <View style={styles.rowContainer}>
                    <View style={styles.checkBackground}>
                        <Check size={typography.subtitle} color={colors.textTertiary} />
                    </View>
                    <Text>Create Upto 15 Lobbies</Text>
                </View>

                <View style={styles.rowContainer}>
                    <View style={styles.checkBackground}>
                        <Check size={typography.subtitle} color={colors.textTertiary} />

                    </View>
                    <Text>Unlimited free pops</Text>
                </View>

                <View style={styles.rowContainer}>
                    <View style={styles.checkBackground}>
                        <Check size={typography.subtitle} color={colors.textTertiary} />

                    </View>
                    <Text>Join upto 50 Lobbies</Text>
                </View>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradientBorder: {
        borderRadius: 10,
        padding: 1.5,
        marginVertical: spacing.sm,
    },
    innerContainer: {
        backgroundColor: colors.backgroundSecondary,
        borderRadius: 9,
        padding: spacing.lg
    },
    heading: {
        fontWeight: '700'
    },
    price: {
        fontSize: typography.headline,
        fontWeight: '800',
    },
    month: {
        fontWeight: '800',
        marginTop: spacing.md,
        fontSize: typography.subtitle
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: '5%',
        marginVertical: spacing.sm
    },
    checkBackground: {
        backgroundColor: colors.background,
        borderRadius: spacing.large,
        padding: spacing.xs
    }
})