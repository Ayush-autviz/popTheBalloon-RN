import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../constants/color'
import QuickStats from '../../components/home/QuickStats'
import spacing from '../../constants/spacing'
import ProfileStack from '../../components/home/ProfileStack'
import FeaturedLobbies from '../../components/home/FeaturedLobbies'
import RecentActivity from '../../components/home/RecentActivity'
import type { Profile } from '../../api/types/discovery'

export default function HomeScreen(): React.ReactElement {
  const handleMatch = (profile: Profile, isSuperLike?: boolean) => {
    // Match handling is now done in ProfileStack component
    console.log('Match with:', profile.firstName, isSuperLike ? '(Super Like)' : '');
  };

  const handleEmpty = () => {
    console.log('No more profiles available');
  };

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <QuickStats />
        <View style={styles.profileSection}>
          <Text style={styles.sectionTitle}>Discover</Text>
          <ProfileStack onMatch={handleMatch} onEmpty={handleEmpty} />
        </View>
        {/* <FeaturedLobbies /> */}
        <RecentActivity />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
    paddingHorizontal: spacing.screenPadding
  },
  profileSection: {
    marginTop: spacing.lg,
    marginBottom: spacing.xlarge,
    marginHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
})