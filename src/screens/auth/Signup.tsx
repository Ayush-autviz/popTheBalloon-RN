import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
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

export default function Signup() {
  const navigation = useNavigation()

  const handleSignup = () => {
    navigation.navigate('AddPhotos')
  }

  const handlePartner = () => {
    navigation.navigate('Partners')
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header text='Create your account' />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <GradientInput label='Email' value='' onChangeText={() => { }} />
        <GradientInput label='Password' value='' onChangeText={() => { }} />

        <Text style={styles.passwordStrength}>Password strength</Text>
        <GradientProgressBar progress={0.5} />

        <GradientCheckbox label='I agree to the Terms of Service' onChange={() => { }} checked={false} />
        <GradientCheckbox label='I agree to the Privacy Policy' onChange={() => { }} checked={false} />


        <Button variant='gradient' text='Sign up' onPress={handleSignup} />

        {/* <Button variant='partner' onPress={handlePartner} /> */}

        <SocialLoginButtons />

        <View style={styles.bottomContainer}>
          <Text style={styles.text}>Already have an account?</Text>
          <TouchableOpacity>
            <Text style={[styles.text, { textDecorationLine: 'underline' }]}>Sign In</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
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