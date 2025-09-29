import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import GradientSlider from '../../ui/GradientSlider'
import GradientSwitch from '../../ui/GradientSwitch'
import spacing from '../../../constants/spacing'
import typography from '../../../constants/typography'
import colors from '../../../constants/color'

export default function CreateLobby6() {

    return (
        <View>
            <Text style={styles.heading}>Revenue Sharing</Text>

            <GradientSlider variant='normal' value={30} onValueChange={() => { }} />

            <View style={styles.rowContainer}>
                <View style={[styles.dot, {backgroundColor: '#DE6F41'}]} />
                <Text style={styles.subheading}>Host Share</Text>
                <Text>60%</Text>
            </View>

            <View style={styles.rowContainer}>
            <View style={[styles.dot, {backgroundColor: '#B02D9F'}]} />
                <Text style={styles.subheading}>Admin Share</Text>
                <Text>40%</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        marginVertical: spacing.lg,
        fontWeight: '700',
        fontSize: typography.subtitle
    },
    subheading: {
        // fontWeight: '500',
        // marginTop: spacing.lg
    },
    rowContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginTop: spacing.sm,
        gap: '5%',
        alignItems: 'center'
    },
    // box: {
    //     backgroundColor: colors.backgroundTertiary,
    //     paddingHorizontal: spacing.lg,
    //     borderColor: '#DBE3E5',
    //     borderWidth: 1,
    //     paddingVertical: spacing.xs,
    //     borderRadius: spacing.sm
    // },
    dot: {
        width: spacing.sm,
        height: spacing.sm,
        borderRadius: spacing.jumbo,
    }
})