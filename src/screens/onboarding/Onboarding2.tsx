import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import spacing from '../../constants/spacing'
import typography from '../../constants/typography'
import ProfileCardList from '../../components/onboarding/ProfileCards'
import GradientButton from '../../components/ui/Button'
import { useNavigation } from '@react-navigation/native'
import colors from '../../constants/color'

export default function Onboarding2() {
  const navigation = useNavigation()
  const handleNext = () => {
    navigation.navigate('Onboarding3')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Join Dating Lobbies</Text>
        <Text style={styles.subheading}>
          Play group dating games, host-led contests, and eliminate players until only one remains.
        </Text>
      </View>

      <View style={styles.listContainer}>
        <ProfileCardList />
      </View>

      <View>
        <Text style={styles.bottomText}>Mini-game preview animation</Text>
        <GradientButton text="Next" onPress={handleNext} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.screenPadding,
    backgroundColor: colors.background
  },
  header: {
    marginTop: spacing.md,
  },
  heading: {
    fontSize: typography.title,
    fontWeight: '700',
    textAlign: 'center',
  },
  subheading: {
    fontSize: typography.body,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  listContainer: {
    flex: 1,
  },
  bottomText: {
    textAlign: 'center',
    fontSize: typography.body,
    marginBottom: spacing.md,
  },
})
