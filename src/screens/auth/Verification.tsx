import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import GradientInput from '../../components/ui/Input'
import spacing from '../../constants/spacing'
import colors from '../../constants/color'
import Button from '../../components/ui/Button'
import typography from '../../constants/typography'

import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import OtpInput from '../../components/auth/OtpInput'

export default function Verification() {
  const navigation =useNavigation()
  const [otp, setOtp] = useState(['', '', '', '','','']);

  const handleClick = () => {
    navigation.navigate('Signup')
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header text='Verify your phone' />

      <View style={styles.container}>
        <GradientInput label='Country' onChangeText={() => { }} value='' />
        <GradientInput label='Password' onChangeText={() => { }} value='' />
        
        <Button variant='gradient' text='Send Code' onPress={handleClick} />

        <OtpInput otp={otp} setOtp={setOtp} />

        <Button variant='grey' text='Resend Code' onPress={() => {}} style={styles.resendButton} />

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