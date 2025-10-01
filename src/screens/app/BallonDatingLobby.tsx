import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import colors from '../../constants/color'
import BallonDatingHeader from '../../components/datingLobby/BallonDatingLobby/BallonDatingHeader'

export default function BallonDatingLobby() {
  return (
    <SafeAreaView style={styles.main}>
      <Header text='Ballon Dating Lobby' />
      <BallonDatingHeader />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.background
    }
})