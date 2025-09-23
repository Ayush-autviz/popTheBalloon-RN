import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../ui/Button'
import spacing from '../../constants/spacing'
import colors from '../../constants/color'
import typography from '../../constants/typography'

export default function SocialLoginButtons() {
    const googleIcon = require('../../assets/icons/google.png')
    const appleIcon = require('../../assets/icons/apple.png')

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Or continue with</Text>

            <Button variant='grey' icon={googleIcon} text='Continue with Google' onPress={() => { }} />
            <Button variant='grey' icon={appleIcon} text='Continue with Apple' onPress={() => { }} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: spacing.lg
    },
    text: {
        color: colors.textPrimary,
        fontWeight: '500',
        fontSize: typography.subtitle
    }
})