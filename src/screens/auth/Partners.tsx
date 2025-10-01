import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import spacing from '../../constants/spacing';
import colors from '../../constants/color';
import { imageOverlayData } from '../../constants/auth/imageOverlayData';
import ImageOverlay from '../../components/ui/ImageOverlay';
import PartnerCard from '../../components/auth/PartnerCard';
import Button from '../../components/ui/Button';

export default function Partners() {
    const data = imageOverlayData[1];

    return (
        <View style={styles.main}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <ImageOverlay item={data} />
                <View style={styles.container}>
                    <PartnerCard />
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button variant='partner' gradientText text='Become Partners' />
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
    footer: {
        padding: spacing.screenPadding,
        backgroundColor: colors.background,
    },
});
