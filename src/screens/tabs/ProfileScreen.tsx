import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../constants/color'
import NetworkError from '../../components/error/NetworkError'
import Header from '../../components/Header'
import spacing from '../../constants/spacing'
import MatchView from '../../components/match/MatchView'


export default function ProfileScreen(): React.ReactElement {
  return (
    <SafeAreaView style={styles.main}>
      <Header text='Profile' backButton={false} />
      <View style={styles.container}>
        {/* <NetworkError /> */}
          <MatchView primaryUserImage={require('../../assets/images/people/Sarah.png')} secondaryUserImage={require('../../assets/images/people/Sarah.png')} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.background
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding,
  }
})