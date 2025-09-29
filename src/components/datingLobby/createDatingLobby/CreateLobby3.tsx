import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import GradientSlider from '../../ui/GradientSlider'
import GradientSwitch from '../../ui/GradientSwitch'
import spacing from '../../../constants/spacing'
import typography from '../../../constants/typography'
import colors from '../../../constants/color'

export default function CreateLobby3() {

    return (
        <View>
            <Text style={styles.heading}>Entry Fee</Text>

            <View style={styles.switchContainer}>
                <GradientSwitch value={true} onValueChange={() => { }} />
                <Text>Enable Entry Fee</Text>
            </View>
            
            <View style={styles.rowContainer}>
            <Text style={styles.subheading}>Entry Fee Amount</Text>
            <View style={styles.box}>
                <Text>$5</Text>
            </View>
            </View>
            <GradientSlider value={10} onValueChange={() => {}} />

            <Text style={styles.heading}>Participation Limit</Text>

            <View style={styles.rowContainer}>
            <Text style={styles.subheading}>Max Participants</Text>
            <View style={styles.box}>
                <Text>100</Text>
            </View>
            </View>
            <GradientSlider value={20} onValueChange={() => {}} />

            <Text style={styles.heading}>Interest Limit</Text>

            <View style={styles.rowContainer}>
            <Text style={styles.subheading}>Max Participants</Text>
            <View style={styles.box}>
                <Text>100</Text>
            </View>
            </View>
            <GradientSlider value={20} onValueChange={() => {}} />
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
        fontWeight: '500',
        // marginTop: spacing.lg
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: spacing.xl
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    box: {
        backgroundColor: colors.backgroundTertiary,
        paddingHorizontal: spacing.lg,
        borderColor: '#DBE3E5',
        borderWidth: 1,
        paddingVertical: spacing.xs,
        borderRadius: spacing.sm
    }
})