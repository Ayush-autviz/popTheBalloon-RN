import React from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import colors from '../../constants/color'
import spacing from '../../constants/spacing'
import typography from '../../constants/typography'
import Button from '../ui/Button'
import { lobbyCardsData, LobbyCard } from '../../constants/datingLobby/lobbyCardsData'
import { useNavigation } from '@react-navigation/native'
import { SvgXml } from 'react-native-svg'
import { PopGradientIcon } from '../../constants/svg'

const   LobbyCards: React.FC = () => {
    const navigation = useNavigation<any>()

    const handleDetails = () => {
        navigation.navigate('App', {screen: 'LobbyDetails'})
    }

    const renderItem = (item: LobbyCard) => {
        return (
            <View style={styles.cardContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.host}>Host: @{item.host}</Text>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.meta}>
                        Participants: {item.participantsCurrent}/{item.participantsMax} | Entry Fee: {item.entryFee}
                    </Text>

                    <View style={styles.buttonRow}>
                        <Button icon={<SvgXml xml={PopGradientIcon} />} text="Details" rounded variant="outline" innerStyle={{paddingVertical: spacing.sm}} style={styles.joinButton}  textStyle={{fontSize: typography.body}} onPress={handleDetails} />
                    </View>
                </View>


                  
                <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
                
            </View>
        )
    }

    return (
        <FlatList
            data={lobbyCardsData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderItem(item)}
            ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
            scrollEnabled={false}
            contentContainerStyle={{ paddingVertical: spacing.md }}
        />
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 9,
        paddingVertical: spacing.xs,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: spacing.md,
    },
    textContainer: {
        flex: 1,
    },
    host: {
        color: colors.textSecondary,
        fontSize: typography.small,
        marginBottom: 2,
    },
    title: {
        fontWeight: '700',
        fontSize: typography.body,
        marginBottom: 2,
    },
    meta: {
        color: colors.textSecondary,
        fontSize: typography.xsmall,
        marginBottom: spacing.xs,
    },
    buttonRow: {
        width: '50%',
    },
    joinButton: {
        marginTop: 0,
    },
    image: {
        width: '40%',
        aspectRatio: 1,
        borderRadius: 8,
    },
})

export default LobbyCards


