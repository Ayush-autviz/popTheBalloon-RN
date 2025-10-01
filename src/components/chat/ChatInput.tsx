import React from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native'
import colors from '../../constants/color'
import spacing from '../../constants/spacing'
import { Image, Mic } from 'lucide-react-native'
import typography from '../../constants/typography'
import Button from '../ui/Button'

type ChatInputProps = {
  value: string
  onChangeText: (text: string) => void
  onSendImage?: () => void
  onSendVoice?: () => void
}

export default function ChatInput({
  value,
  onChangeText,
  onSendImage,
  onSendVoice,
}: ChatInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
      />
      <View style={styles.iconContainer}>
      <Button onPress={onSendImage} variant='ghost' icon={<Image color={colors.textSecondary} />} style={{marginTop: 0}} />
        <Button onPress={onSendVoice} variant='ghost' icon={<Mic color={colors.textSecondary} />} style={{marginTop: 0}} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundTertiary,
    borderRadius: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  input: {
    flex: 1,
    fontSize: typography.subtitle,
    color: colors.textPrimary,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginLeft: spacing.sm,
  },
})
