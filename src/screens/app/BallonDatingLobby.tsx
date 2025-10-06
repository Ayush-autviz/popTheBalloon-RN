import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import colors from '../../constants/color'
import BallonDatingHeader from '../../components/datingLobby/BallonDatingLobby/BallonDatingHeader'
import StatsCard from '../../components/datingLobby/BallonDatingLobby/StatsCard'
import Questions from '../../components/datingLobby/BallonDatingLobby/Questions'
import Participants from '../../components/datingLobby/BallonDatingLobby/Participants'
import { participantsData } from '../../constants/datingLobby/participantsData'
import Button from '../../components/ui/Button'
import spacing from '../../constants/spacing'
import { useNavigation } from '@react-navigation/native'

export default function BallonDatingLobby(): React.ReactElement {

  const navigation = useNavigation<any>()
  const handleLike = (participantId: string) => {
    console.log('Liked participant:', participantId);
    // Add your like logic here
  };

  const handleDismiss = (participantId: string) => {
    console.log('Dismissed participant:', participantId);
    // Add your dismiss logic here
  };

  const handleParticipantPress = (participantId: string) => {
    navigation.navigate('App', {screen: 'ParticipantDetails'})
  };

  return (
    <SafeAreaView style={styles.main}>
      <Header text='Ballon Dating Lobby' />
      <ScrollView>  
      <BallonDatingHeader />
      <StatsCard />
      <Questions />
      <Participants 
        participants={participantsData}
        onLike={handleLike}
        onDismiss={handleDismiss}
        onParticipantPress={handleParticipantPress}
      />
      <View style={styles.actionButtons}>
        <Button text='Manage Event' />
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.background
    },
    actionButtons: {
        paddingHorizontal: spacing.screenPadding,
        paddingBottom: spacing.screenPadding,
    }
})