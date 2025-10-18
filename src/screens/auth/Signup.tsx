import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import Header from '../../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import spacing from '../../constants/spacing'
import colors from '../../constants/color'
import GradientInput from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import SocialLoginButtons from '../../components/auth/SocialLoginButtons'
import GradientCheckbox from '../../components/ui/Checkbox'
import GradientProgressBar from '../../components/ui/ProgressBar'
import { useNavigation } from '@react-navigation/native'
import { z } from 'zod'
import { useRegister, useEmailVerify, useResendEmailOtp } from '../../hooks/useAuth'
import OtpModal from '../../components/auth/OtpModal'
import { useToast } from '../../hooks/useToast'
import { useAuthStore } from '../../store/authStore'


type FormState = {
  email: string
  password: string
  confirmPassword: string
  terms: boolean
  privacy: boolean
}

export default function Signup(): React.ReactElement {
  const navigation = useNavigation<any>()
  const { mutate: register, isPending } = useRegister()
  const { mutate: emailVerify, isPending: isVerifying } = useEmailVerify()
  const { mutate: resendEmailOtp, isPending: isResending } = useResendEmailOtp()
  const [otpVisible, setOtpVisible] = useState(false)
  const toast = useToast()
  const { setAuthData, setUserPref } = useAuthStore()

  const [form, setForm] = useState<FormState>({
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
    privacy: false,
  })

  const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must include at least one uppercase letter')
    .regex(/\d/, 'Must include at least one number')
    .regex(/[^A-Za-z0-9]/, 'Must include at least one special character')

  const schema = useMemo(() => z
    .object({
      email: z.string().email('Enter a valid email'),
      password: passwordSchema,
      confirmPassword: z.string().min(8, 'Confirm your password'),
      terms: z.boolean().refine((v) => v, 'You must accept the terms'),
      privacy: z.boolean().refine((v) => v, 'You must accept the privacy policy'),
    })
    .refine((val) => val.password === val.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }), [] )

  const handleSignup = () => {
    const parsed = schema.safeParse(form)
    if (!parsed.success) {
      const first = parsed.error.issues[0]
      toast.error('Validation Error', first.message)
      return
    }
    register(
      { email: parsed.data.email, password: parsed.data.password, confirmPassword: parsed.data.confirmPassword, registerType: 'email' },
      {
        onSuccess: (res) => { 
          console.log('[Signup] Registration success', res)
          
          // Handle the actual response structure - take token only from data
          const token = res.data?.token || res.Token
          const userPref = res.data?.userPref || res.UserPref
          
          if (token && userPref) {
            // Remove "Bearer " prefix if present
            const cleanToken = token.startsWith('Bearer ') ? token.substring(7) : token
            setAuthData(cleanToken, userPref)
            console.log('[Signup] Auth data stored in Zustand')
          } else if (token) {
            const cleanToken = token.startsWith('Bearer ') ? token.substring(7) : token
            useAuthStore.getState().setToken(cleanToken)
            console.log('[Signup] Token stored in Zustand')
          }
          
          setOtpVisible(true)
          toast.success('Account Created', 'Please verify your email address')
        },
        onError: (err) => toast.error('Signup Failed', String(err)),
      }
    )
  }

  const handleEmailVerify = (code: string) => {
    emailVerify(
      { email: form.email, verificationCode: code },
      {
        onSuccess: (res) => {
          console.log('[Signup] Email verified', res)
          
          // Handle the actual response structure - take token only from data
          const token = res.data?.token
          const userPref = res.data?.userPref
          
          if (token && userPref) {
            // Remove "Bearer " prefix if present
            const cleanToken = token.startsWith('Bearer ') ? token.substring(7) : token
            setAuthData(cleanToken, userPref)
            console.log('[Signup] Updated auth data stored in Zustand')
          } else if (token) {
            const cleanToken = token.startsWith('Bearer ') ? token.substring(7) : token
            useAuthStore.getState().setToken(cleanToken)
            console.log('[Signup] Updated token stored in Zustand')
          }
          
          setOtpVisible(false)
          navigation.navigate('Auth', { screen: 'Verification' })
          toast.success('Email Verified', 'Your account has been successfully verified')
        },
        onError: (err: any) => {
          console.log('[Signup] Verification failed', err)
          toast.error('Verification Failed', String(err.response?.data?.msg))
        }
      }
    )
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header text='Create your account' backButton={false} />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <GradientInput label='Email' value={form.email} onChangeText={(v) => setForm((s) => ({ ...s, email: v }))} />
        <GradientInput label='Password' value={form.password} onChangeText={(v) => setForm((s) => ({ ...s, password: v }))} />
        <GradientInput label='Confirm Password' value={form.confirmPassword} onChangeText={(v) => setForm((s) => ({ ...s, confirmPassword: v }))} />
        

        <Text style={styles.passwordStrength}>Password strength</Text>
        <GradientProgressBar progress={(form.password.length >= 8 ? 0.25 : 0) + (/[A-Z]/.test(form.password) ? 0.25 : 0) + (/\d/.test(form.password) ? 0.25 : 0) + (/[^A-Za-z0-9]/.test(form.password) ? 0.25 : 0)} />

        <GradientCheckbox label='I agree to the Terms of Service' onChange={(v) => setForm((s) => ({ ...s, terms: !form.terms }))} checked={form.terms} />
        <GradientCheckbox label='I agree to the Privacy Policy' onChange={(v) => setForm((s) => ({ ...s, privacy: !form.privacy }))} checked={form.privacy} />


        <Button variant='gradient' text='Sign up' onPress={handleSignup} loading={isPending} disabled={isPending} />

        <SocialLoginButtons />

        <View style={styles.bottomContainer}>
          <Text style={styles.text}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Auth', { screen: 'Signin' })}>
            <Text style={[styles.text, { textDecorationLine: 'underline' }]}>Sign In</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
      <OtpModal
        email={form.email}
        visible={otpVisible}
        onClose={() => setOtpVisible(false)}
        onVerify={(code) =>
          handleEmailVerify(code)
        }
        onResend={() => resendEmailOtp(
          { email: form.email },
          {
            onSuccess: () => toast.success('Code Sent', 'A new verification code has been sent to your email'),
            onError: (err) => toast.error('Resend Failed', String(err)),
          }
        )}
        isVerifying={isVerifying}
        isResending={isResending}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.screenPadding,
    backgroundColor: colors.background,
    flex: 1,
  },
  text: {
    color: colors.textPrimary,
  },
  passwordStrength: {
    color: colors.textSecondary,
    fontWeight: '500',
    marginTop: spacing.sm,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: spacing.md
  },
})