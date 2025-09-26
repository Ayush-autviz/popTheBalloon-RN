import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../constants/color'
import Header from '../../components/Header'
import spacing from '../../constants/spacing'
import ProgressSteps from '../../components/datingLobby/createDatingLobby/ProgressSteps'

export default function CreateDatingLobby() {
  return (
   <SafeAreaView style={styles.main}>
    <Header text='Dating Lobby' />
    <View style={styles.container} >
      <ProgressSteps currentStep={1} />
    </View>
   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    main: {
        flex:1,
        backgroundColor: colors.background
    },
    container: {
      flex: 1,
      paddingHorizontal: spacing.screenPadding
    }
})