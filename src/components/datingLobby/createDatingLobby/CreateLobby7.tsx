import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import typography from '../../../constants/typography'
import spacing from '../../../constants/spacing'
import colors from '../../../constants/color'

type CostRowProps = {
    label: string
    value: string
    isLast?: boolean
}

const CostRow: React.FC<CostRowProps> = ({ label, value, isLast = false }) => (
    <View style={[styles.row, !isLast && styles.bottomBorder]}>
        <View style={{flex: 1}}>
            <Text style={styles.label}>{label}</Text>
        </View>
        <View style={{flex: 1}}>
            <Text style={styles.value}>{value}</Text>
        </View>
    </View>
)

export default function CreateLobby7(): React.ReactElement {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.heading}>Preview</Text>

            <Image source={require('../../../assets/images/datingLobby/movieDate.png')} style={styles.image} />

            <Text style={styles.heading}>Dating Lobby</Text>
            <Text style={styles.miniText}>A place to meet new people</Text>
            <Text style={styles.miniText}>100 Participants</Text>

            <Text style={styles.creationHeading}>Creation Cost</Text>

            <CostRow label='Base Cost' value='$10' isLast={false} />
            <CostRow label='Theme Cost' value='$5' isLast={false} />
            <CostRow label='Total Cost' value='$15' isLast={true} />


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    heading: {
        fontWeight: '600',
        fontSize: typography.subtitle
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: spacing.lg,
        marginVertical: spacing.lg
    },
    miniText: {
        color: colors.textSecondary,
        marginTop: spacing.xs,
        fontSize: typography.small
    },
    creationHeading: {
        fontWeight: '600',
        fontSize: typography.subtitle,
        marginVertical: spacing.xxl
    },
    row: {
        flexDirection: "row",
        paddingBottom: spacing.lg,
        marginVertical: spacing.md
    },
    label: {
        color: colors.textSecondary,
        fontSize: typography.small

    },
    value: {
        fontSize: typography.small
    },
    bottomBorder: {
        borderBottomColor: colors.textSecondary,
        borderBottomWidth: 0.5
    }
})