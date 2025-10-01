import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import colors from '../../constants/color'
import { EllipsisVertical } from 'lucide-react-native'
import spacing from '../../constants/spacing'
import ChatInbox from '../../components/chat/ChatInbox'
import { conversations } from '../../constants/chat/conversations'
import ChatSearch from '../../components/chat/ChatSearch'

export default function ChatScreen(): React.ReactElement {
  return (
    <SafeAreaView style={styles.main}>
      <Header text='Chat' icon={<EllipsisVertical />} backButton={false} />
      <View style={styles.container}>
        <ChatSearch value='' onChangeText={() => {}} />
        <ChatInbox conversations={conversations} />
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