import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useMemo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { z } from 'zod'

import colors from '../../constants/color'
import spacing from '../../constants/spacing'
import Header from '../../components/Header'
import GradientInput from '../../components/ui/Input'
import GradientCheckbox from '../../components/ui/Checkbox'
import Button from '../../components/ui/Button'
import SocialLoginButtons from '../../components/auth/SocialLoginButtons'
import { useLogin } from '../../hooks/useAuth'
import { useAuthStore } from '../../store/authStore'
import { useToast } from '../../hooks/useToast'

type FormData = {
    email: string
    password: string
    rememberMe: boolean
}

export default function Signin() {
    const navigation = useNavigation<any>()
    const { mutate: login, isPending } = useLogin()
    const { setAuthData, setOnboardingCompleted } = useAuthStore()
    const toast = useToast()
    
    const [form, setForm] = useState<FormData>({
        email: '',
        password: '',
        rememberMe: false
    })
    
    const schema = useMemo(() => z.object({
        email: z.string().email('Enter a valid email'),
        password: z.string().min(1, 'Password is required')
    }), [])
    
    const handleLogin = () => {
        const parsed = schema.safeParse(form)
        if (!parsed.success) {
            const first = parsed.error.issues[0]
            toast.error('Validation Error', first.message)
            return
        }
        
        login({
            email: parsed.data.email,
            password: parsed.data.password,
            loginType: 'email'
        }, {
            onSuccess: (res) => {
                console.log('[Signin] Login success', res)
                
                // Handle the actual response structure
                const token = res.auth?.token
                const userData = res.data
                
                if (token && userData) {
                    // Remove "Bearer " prefix if present
                    const cleanToken = token.startsWith('Bearer ') ? token.substring(7) : token
                    
                    // Create UserPref object from the response data
                    const userPref = {
                        email: userData.email || '',
                        firstName: userData.firstName || '',
                        lastName: userData.lastName || '',
                        registrationStep: userData.registrationStep || 1,
                        registrationCompleted: userData.registrationCompleted || false
                    }
                    
                    setAuthData(cleanToken, userPref)
                    console.log('[Signin] Auth data stored in Zustand')

                    // Set onboarding as completed since user has completed registration
                    setOnboardingCompleted(true)

                    // Navigate based on registration step
                    if (userPref.registrationCompleted) {
                        // Registration completed, go to main app
                        navigation.navigate('App')
                        toast.success('Welcome Back!', 'Login successful')
                    } else {
                        // Registration not completed, navigate to appropriate step
                        switch (userPref.registrationStep) {
                            case 1:
                                navigation.navigate('Auth', { screen: 'Verification' })
                                break
                            case 2:
                                navigation.navigate('UserDetails')
                                break
                            case 3:
                                navigation.navigate('AddPhotos')
                                break
                            case 4:
                                navigation.navigate('AboutYourself')
                                break
                            default:
                                navigation.navigate('Auth', { screen: 'Verification' })
                        }
                        toast.success('Login Successful', 'Please complete your registration')
                    }
                } else {
                    toast.error('Login Failed', 'Invalid response from server')
                }
            },
            onError: (err: any) => {
                console.log('[Signin] Login failed', err)
                toast.error('Login Failed', String(err.response?.data?.msg || 'Invalid credentials'))
            }
        })
    }
    
    const handleForgotPassword = () => {
        // TODO: Implement forgot password flow
        Alert.alert('Forgot Password', 'Forgot password functionality will be implemented soon.')
    }
    
    const handleSignup = () => {
        navigation.navigate('Auth', { screen: 'Signup' })
    }
    
    return (
        <SafeAreaView style={styles.main}>
            <Header text='Login' backButton={false} />
            <View style={styles.container}>
            <GradientInput 
                label='Email' 
                value={form.email} 
                onChangeText={(v) => setForm(prev => ({ ...prev, email: v }))} 
                keyboardType='email-address'
            />
            <GradientInput 
                label='Password' 
                value={form.password} 
                onChangeText={(v) => setForm(prev => ({ ...prev, password: v }))} 
                secureTextEntry
            />

                <GradientCheckbox 
                    label='Remember Me' 
                    onChange={() => setForm(prev => ({ ...prev, rememberMe: !prev.rememberMe }))} 
                    checked={form.rememberMe} 
                />
                <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={styles.text}>Forgot Password?</Text>
                </TouchableOpacity>

                <Button 
                    variant='gradient' 
                    text='Login' 
                    onPress={handleLogin}
                    loading={isPending}
                    disabled={isPending}
                />

                <SocialLoginButtons />
                
                <View style={styles.bottomContainer}>
                    <Text style={styles.text}>Don't have an account? </Text>
                    <TouchableOpacity onPress={handleSignup}>
                        <Text style={[styles.text, { textDecorationLine: 'underline' }]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
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
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        marginTop: spacing.md
    }
})