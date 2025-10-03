import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../constants/color'
import spacing from '../../constants/spacing'
import Header from '../../components/Header'
import TimeTabs from '../../components/datingLobby/TimeTabs'
import LobbyCards from '../../components/datingLobby/LobbyCards'
import Button from '../../components/ui/Button'
import { useNavigation } from '@react-navigation/native'
import LobbySearch from '../../components/datingLobby/LobbySearch'


export default function LobbyScreen(): React.ReactElement {
const navigation = useNavigation<any>()
  const handleCreateLobby = () => {
    navigation.navigate('App', {screen: 'CreateLobby'})
  }

  return (
    <SafeAreaView style={styles.main}>
      <Header text='Dating Lobby' />
      <View style={styles.container}>

        <LobbySearch value='' onChangeText={() => { }} />
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
    padding: spacing.screenPadding,
    flex: 1
  }
})