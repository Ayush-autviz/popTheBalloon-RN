import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ChatBubbles from '../../../components/chat/ChatBubble'
import { messages } from '../../../constants/chat/messages'
import ChatInput from '../../../components/chat/ChatInput'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../../constants/color'
import spacing from '../../../constants/spacing'
import Header from '../../../components/Header'
import ChatConversation from '../../../components/chat/ChatBubble'

export default function MessageScreen() {
    return (
        <SafeAreaView style={styles.main}>
            <Header text='Sophia' />
            <View style={styles.container}>
                <ChatConversation messages={messages} />
                <ChatInput value='' onChangeText={() => { }} />
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
        paddingHorizontal: spacing.screenPadding
    }
})