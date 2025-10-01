import React from 'react'
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import spacing from '../../constants/spacing'
import typography from '../../constants/typography'
import colors from '../../constants/color'
import { useNavigation } from '@react-navigation/native'

type Conversation = {
  id: string
  avatar: ImageSourcePropType
  title: string
  subtitle: string
  time: string
  unreadCount?: number
}

type ChatProps = {
  conversations: Conversation[]
}

const ChatListItem: React.FC<Conversation> = ({
  avatar,
  title,
  subtitle,
  time,
  unreadCount,
}) => {

    const navigation = useNavigation<any>()

  return (
    <TouchableOpacity onPress={() => navigation.navigate('App', {screen: 'MessageScreen'})} style={styles.row}>
      <Image source={avatar} style={styles.avatar} />

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle} numberOfLines={2}>
          {subtitle}
        </Text>
      </View>

      <View style={styles.rightContainer}>
        <Text style={styles.time}>{time}</Text>
        {unreadCount !== undefined && unreadCount > 0 && (
          <LinearGradient
            colors={colors.gradientPrimary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.badge}
          >
            <Text style={styles.badgeText}>{unreadCount}</Text>
          </LinearGradient>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default function ChatInbox({ conversations }: ChatProps) {
  return (
    <FlatList
      data={conversations}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatListItem {...item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  avatar: {
    width: spacing.xlarge,
    height: spacing.xlarge,
    borderRadius: spacing.jumbo,
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: typography.body,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    width: '85%'
  },
  rightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 6,
  },
  time: {
    fontSize: typography.small,
    color: colors.textSecondary,
  },
  badge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: typography.small,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
})
