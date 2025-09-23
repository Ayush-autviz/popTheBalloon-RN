import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../constants/color'
import spacing from '../../constants/spacing'
import Header from '../../components/Header'
import GradientInput from '../../components/ui/Input'
import GradientCheckbox from '../../components/ui/Checkbox'
import Button from '../../components/ui/Button'
import SocialLoginButtons from '../../components/auth/SocialLoginButtons'

export default function Signin() {
    return (
        <SafeAreaView style={styles.main}>
            <Header text='Login' backButton={false} />
            <View style={styles.container}>
                <GradientInput label='Email' value='' onChangeText={() => { }} />
                <GradientInput label='Password' value='' onChangeText={() => { }} />

                <GradientCheckbox label='Remember Me' onChange={() => { }} checked={false} />
                <Text style={styles.text}>Forgot Password?</Text>

                <Button variant='gradient' text='Login' />

                <SocialLoginButtons />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.background
    },
    container: {
        padding: spacing.screenPadding,
        flex: 1
    },
    text: {
        color: colors.textSecondary,
        marginVertical: spacing.sm
    }
})