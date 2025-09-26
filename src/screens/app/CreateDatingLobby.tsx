import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../constants/color'
import Header from '../../components/Header'
import spacing from '../../constants/spacing'
import ProgressSteps from '../../components/datingLobby/createDatingLobby/ProgressSteps'
import CreateLobby1 from '../../components/datingLobby/createDatingLobby/CreateLobby1'
import Button from '../../components/ui/Button'
import CreateLobby2 from '../../components/datingLobby/createDatingLobby/CreateLobby2'
import CreateLobby3 from '../../components/datingLobby/createDatingLobby/CreateLobby3'

export default function CreateDatingLobby() {
  return (
   <SafeAreaView style={styles.main}>
    <Header text='Dating Lobby' />
    <View style={styles.container} >
      <ProgressSteps currentStep={1} />
      {/* <CreateLobby1 /> */}
      {/* <CreateLobby2 /> */}
      <CreateLobby3 />
    </View>
    <Button style={{marginHorizontal: spacing.screenPadding}} text='Continue' />
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