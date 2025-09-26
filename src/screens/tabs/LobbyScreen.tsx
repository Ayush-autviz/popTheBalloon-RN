import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../constants/color'
import spacing from '../../constants/spacing'
import Header from '../../components/Header'
import Search from '../../components/ui/Search'
import TimeTabs from '../../components/datingLobby/TimeTabs'
import LobbyCards from '../../components/datingLobby/LobbyCards'
import Button from '../../components/ui/Button'
import { useNavigation } from '@react-navigation/native'


export default function LobbyScreen() {
const navigation = useNavigation()
  const handleCreateLobby = () => {
    navigation.navigate('App', {Screen: 'CreateLobby'})
  }

  return (
    <SafeAreaView style={styles.main}>
      <Header text='Dating Lobby' />
      <View style={styles.container}>

        <Search value='' onChangeText={() => { }} />
        <TimeTabs />
        <ScrollView showsVerticalScrollIndicator={false}>
          <LobbyCards />
        </ScrollView>
        
        <Button onPress={handleCreateLobby} style={{}} text='Create Lobby' />
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    paddingHorizontal: spacing.screenPadding,
    flex: 1
  }
})