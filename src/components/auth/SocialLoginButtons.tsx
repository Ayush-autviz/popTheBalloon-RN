import { StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'
import Button from '../ui/Button'
import spacing from '../../constants/spacing'
import colors from '../../constants/color'
import typography from '../../constants/typography'
import { useGoogleSignIn } from '../../hooks/useGoogleAuth'

export default function SocialLoginButtons() {
    const googleIcon = require('../../assets/icons/google.png')
    const appleIcon = require('../../assets/icons/apple.png')
    
    const googleSignInMutation = useGoogleSignIn()

    const handleGoogleSignIn = async () => {
        try {
            const result = await googleSignInMutation.mutateAsync()
            if (result.success) {
                console.log('Successfully signed in with Google!', result.user)
                // You can add navigation logic here or handle success in parent component
            } else {
                Alert.alert('Sign In Failed', result.error || 'Google Sign-In failed')
            }
        } catch (error) {
            console.error('Google Sign-In Error:', error)
            Alert.alert('Sign In Error', 'An error occurred during Google Sign-In')
        }
    }

    const handleAppleSignIn = () => {
        // TODO: Implement Apple Sign-In
        console.log('Apple Sign-In not implemented yet')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Or continue with</Text>

            <Button 
                variant='grey' 
                image={googleIcon} 
                text='Continue with Google' 
                onPress={handleGoogleSignIn}
                loading={googleSignInMutation.isPending}
            />
            <Button 
                variant='grey' 
                image={appleIcon} 
                text='Continue with Apple' 
                onPress={handleAppleSignIn}
            />

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