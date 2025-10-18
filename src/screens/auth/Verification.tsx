import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import Header from '../../components/Header'
import GradientInput from '../../components/ui/Input'
import spacing from '../../constants/spacing'
import colors from '../../constants/color'
import Button from '../../components/ui/Button'
import typography from '../../constants/typography'

import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import OtpInput from '../../components/auth/OtpInput'
import { z } from 'zod'
import { useSendPhoneOtp, useVerifyPhoneOtp } from '../../hooks/useAuth'
import { useAuthStore } from '../../store/authStore'
import { useToast } from '../../hooks/useToast'

export default function Verification() {
  const navigation = useNavigation<any>()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [phone, setPhone] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const { mutate: sendOtp, isPending: isSendingOtp } = useSendPhoneOtp()
  const { mutate: verifyOtp, isPending: isVerifyingOtp } = useVerifyPhoneOtp()
  const { setAuthData, setUserPref } = useAuthStore()
  const toast = useToast()

  const schema = useMemo(() => z.object({
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  }), [])

  const handleSendOtp = () => {
    console.log('[Verification] Send Code clicked', { phone })
    const parsed = schema.safeParse({ phone })
    if (!parsed.success) {
      const first = parsed.error.issues[0]
      console.log('[Verification] Validation failed', first)
      toast.error('Validation Error', first.message)
      return
    }

    console.log('[Verification] Validation passed, sending OTP...')
    sendOtp(
      { phoneNumber: parsed.data.phone },
      {
        onSuccess: (res) => {
          console.log('[Verification] OTP sent success', res)
          setOtpSent(true)
          toast.success('OTP Sent', 'OTP sent successfully to your phone number')
        },
        onError: (err) => {
          console.log('[Verification] OTP sent error', err)
          toast.error('Error', 'Failed to send OTP. Please try again.')
        },
      }
    )
  }

  const handleVerifyOtp = () => {
    const otpCode = otp.join('')
    if (otpCode.length !== 6) {
      toast.error('Error', 'Please enter a valid 6-digit OTP')
      return
    }

    console.log('[Verification] Verifying OTP', { phone, otpCode })
    verifyOtp(
      { phoneNumber: phone, otpCode },
      {
        onSuccess: (res) => {
          console.log('[Verification] OTP verification success', res)
          
          // Handle the actual response structure - take token only from data
          const token = res.data?.token || res.Token
          const userPref = res.data?.userPref || res.userPref
          
          if (token && userPref) {
            // Remove "Bearer " prefix if present
            const cleanToken = token.startsWith('Bearer ') ? token.substring(7) : token
            setAuthData(cleanToken, userPref)
            console.log('[Verification] Updated auth data stored in Zustand')
          } else if (token) {
            const cleanToken = token.startsWith('Bearer ') ? token.substring(7) : token
            useAuthStore.getState().setToken(cleanToken)
            console.log('[Verification] Updated token stored in Zustand')
          }
          
          toast.success('Success', 'Phone number verified successfully!')
          // Navigate to UserDetails screen (registration step 2)
          navigation.navigate('UserDetails')
        },
        onError: (err) => {
          console.log('[Verification] OTP verification error', err)
          toast.error('Error', 'Invalid OTP. Please try again.')
        },
      }
    )
  }

  const handleResendOtp = () => {
    if (!phone) {
      toast.error('Error', 'Please enter your phone number first')
      return
    }

    console.log('[Verification] Resending OTP', { phone })
    sendOtp(
      { phoneNumber: phone },
      {
        onSuccess: (res) => {
          console.log('[Verification] OTP resent success', res)
          toast.success('Success', 'OTP resent successfully')
        },
        onError: (err) => {
          console.log('[Verification] OTP resent error', err)
          toast.error('Error', 'Failed to resend OTP. Please try again.')
        },
      }
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header text='Verify your phone' />

      <View style={styles.container}>
        <GradientInput 
          label='Phone Number' 
          onChangeText={setPhone} 
          value={phone} 
          placeholder='Enter your US phone number'
          keyboardType='phone-pad'
        />

        {!otpSent ? (
          <Button 
            variant='gradient' 
            text='Send Code' 
            loading={isSendingOtp} 
            onPress={handleSendOtp} 
            disabled={isSendingOtp} 
          />
        ) : (
          <>
            <OtpInput otp={otp} setOtp={setOtp} />
            
            <Button 
              variant='gradient' 
              text='Verify Code' 
              loading={isVerifyingOtp} 
              onPress={handleVerifyOtp} 
              disabled={isVerifyingOtp} 
            />
            
            <Button 
              variant='grey' 
              text='Resend Code' 
              onPress={handleResendOtp} 
              style={styles.resendButton} 
            />
          </>
        )}

        <Text style={styles.text}>Your phone number will only be used for verification and will not be shared with anyone.</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.screenPadding,
    backgroundColor: colors.background,
    flex: 1
  },
  resendButton: {
    marginHorizontal: 'auto',
    paddingHorizontal: spacing.large
  },
  text: {
    fontSize: typography.body,
    textAlign: 'center',
    color: colors.textPrimary,
    marginTop: spacing.lg
  }
})