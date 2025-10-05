import React, { useMemo, useState } from 'react'
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../../constants/color'
import spacing from '../../constants/spacing'
import typography from '../../constants/typography'
import Button from '../ui/Button'
import OtpInput from './OtpInput'
import { X } from 'lucide-react-native'

export type OtpModalProps = {

  visible: boolean
  email: string
  phoneMasked?: string
  onClose: () => void
  onVerify: (otpCode: string) => void
  onResend?: () => void
  isVerifying?: boolean
  isResending?: boolean
}

const OtpModal: React.FC<OtpModalProps> = ({
  visible,
  phoneMasked,
  email,
  
  onClose,
  onVerify,
  onResend,
  isVerifying = false,
  isResending = false,
}) => {
  const [otpArray, setOtpArray] = useState<string[]>(['', '', '', '', '', ''])

  const otpCode = useMemo(() => otpArray.join(''), [otpArray])

  const handleVerify = (): void => {
    onVerify(otpCode)
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Verify OTP</Text>
            <TouchableOpacity onPress={onClose} accessibilityLabel="Close OTP modal">
              <X />
            </TouchableOpacity>
          </View>

          {/* {phoneMasked ? (
            <Text style={styles.subtitle}>We sent a code to {phoneMasked}</Text>
          ) : ( */}
            <Text style={styles.subtitle}>Enter the 6-digit code we sent</Text>
          {/* )} */}

          <OtpInput otp={otpArray} setOtp={setOtpArray} style={{width: spacing.screenWidth/8}} boxStyle={{paddingVertical: spacing.xs}} />

          <Button
            variant="gradient"
            // style={{paddingVertical: spacing.sm}}
            text={isVerifying ? 'Verifying…' : 'Verify'}
            loading={isVerifying}
            onPress={handleVerify}
            disabled={isVerifying || otpCode.length !== 6}
          />

          <Button
            variant="ghost"
            style={{paddingVertical: spacing.sm}}
            text={isResending ? 'Resending…' : 'Resend Code'}
            onPress={onResend}
            disabled={isResending}
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlayDark,
    justifyContent: 'center',
    padding: spacing.screenPadding,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: spacing.lg,
    padding: spacing.xl,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.secondaryTitle,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  close: {
    fontSize: typography.headline,
    color: colors.textSecondary,
    paddingHorizontal: spacing.sm,
  },
  subtitle: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
})

export default OtpModal

