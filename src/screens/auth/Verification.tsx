import { Alert, StyleSheet, Text, View } from 'react-native'
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
import { useSendPhoneOtp } from '../../hooks/useAuth'
import { useAuthStore } from '../../store/authStore'

export default function Verification() {
  const navigation = useNavigation<any>()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [country, setCountry] = useState('')
  const [phone, setPhone] = useState('')
  const { mutate: sendOtp, isPending } = useSendPhoneOtp()

  const schema = useMemo(() => z.object({
    // country: z.string().min(1, 'Country is required'),
    phone: z.string().min(8, 'Phone is too short'),
  }), [])

  const handleClick = () => {

    console.log('[Verification] Send Code clicked', { country, phone })
    const parsed = schema.safeParse({ country, phone })
    if (!parsed.success) {

      const first = parsed.error.issues[0]

      console.log('[Verification] Validation failed', first)
      Alert.alert(first.message)
      return
    }

    console.log('[Verification] Validation passed, sending OTP...')
    sendOtp(
      {phoneNumber: parsed.data.phone },
      {
        onSuccess: (res) => {

          console.log('[Verification] OTP sent success', res)
        },
        onError: (err) => {

          console.log('[Verification] OTP sent error', err)
        },
      }
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header text='Verify your phone' />

      <View style={styles.container}>
        <GradientInput label='Country' onChangeText={setCountry} value={country} />
        <GradientInput label='Phone Number' onChangeText={setPhone} value={phone} />

        <Button variant='gradient' text={'Send Code'} loading={isPending} onPress={handleClick} disabled={isPending} />

        <OtpInput otp={otp} setOtp={setOtp} />

        <Button variant='grey' text='Resend Code' onPress={() => { }} style={styles.resendButton} />

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