import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import spacing from '../../constants/spacing';
import colors from '../../constants/color';
import { imageOverlayData } from '../../constants/auth/imageOverlayData';
import ImageOverlay from '../../components/ui/ImageOverlay';
import Button from '../../components/ui/Button';
import LinearGradient from 'react-native-linear-gradient';
import typography from '../../constants/typography';
import { useNavigation } from '@react-navigation/native';
import { Check } from 'lucide-react-native';

export default function Partners(): React.ReactElement {
    const colors = ['#FEFEFE', '#EFEFFF']
    const navigation = useNavigation<any>()
    const data = imageOverlayData[0];
    const handleStart = () => {
        navigation.navigate('Auth', { screem: 'UserDetails' })
    }



    return (
        <View style={styles.main}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <ImageOverlay item={data} />
                <View style={styles.container}>
                    <View style={styles.cardBorder}>
                        <LinearGradient colors={colors} style={styles.priceCard}>
                            <Text style={styles.planLabel}>Premium</Text>
                            <Text style={styles.price}>
                                <Text style={styles.priceAmount}>$9.99</Text>
                                <Text style={styles.pricePeriod}> /month</Text>
                            </Text>

                            <View style={styles.benefits}>
                                <View style={styles.rowContainer}>
                                    <Check size={typography.secondaryTitle} />
                                    <Text style={styles.benefit}>Unlimited free pops</Text>
                                </View>
                                <View style={styles.rowContainer}>
                                    <Check size={typography.secondaryTitle} />
                                    <Text style={styles.benefit}>Join up to 15 Lobbies</Text>
                                </View>
                            </View>
                        </LinearGradient>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button variant="gradient" text='Start Free' onPress={handleStart} />
                <Button variant="grey" text="View Plans" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        flexGrow: 1,
    },
    container: {
        padding: spacing.screenPadding,
        backgroundColor: colors.background,
    },
    cardBorder: {
        borderColor: '#E5DBDE',
        borderWidth: 1,
        borderRadius: spacing.md,
        marginTop: spacing.sm
    },
    planLabel: {
        fontSize: typography.body,
        fontWeight: '500',
        marginBottom: 4,
    },
    priceCard: {
        padding: spacing.md,
        borderRadius: spacing.md,
    },
    price: {
        fontSize: typography.title,
        fontWeight: '700',
        marginBottom: spacing.md,
    },
    priceAmount: {
        fontSize: typography.headline,
        fontWeight: '800',
    },
    pricePeriod: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.textPrimary,
    },
    benefits: {
        gap: 4,
    },
    benefit: {
        fontSize: typography.body,
        color: '#333',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: "3%"
    },
    footer: {
        padding: spacing.screenPadding,
        backgroundColor: colors.background,
    },
});
