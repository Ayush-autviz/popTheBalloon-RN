import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../constants/color'
import QuickStats from '../../components/home/QuickStats'
import spacing from '../../constants/spacing'
import ProfileInfo from '../../components/home/ProfileInfo'
import FeaturedLobbies from '../../components/home/FeaturedLobbies'
import RecentActivity from '../../components/home/RecentActivity'

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.main}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <QuickStats />
        <ProfileInfo />
        <FeaturedLobbies />
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
  }
})