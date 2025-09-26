import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import typography from '../../constants/typography'
import spacing from '../../constants/spacing'
import colors from '../../constants/color'
import { RecentActivityData } from '../../constants/home/recentActivityData'
import { Heart, MessageCircleMore, User, UserRound } from 'lucide-react-native'

type NotificationType = 'like' | 'join' | 'message'

interface Notification {
  id: string
  name: string
  message: string
  timeAgo: string
  avatarUrl: string
  type: NotificationType
}

const typeToIcon = {
  like: <Heart size={typography.secondaryTitle} fill={'#fff'} color={'#fff'} />,
  join: <UserRound size={typography.secondaryTitle} fill={'#fff'} color={'#fff'} />,
  message: <MessageCircleMore size={typography.secondaryTitle} fill={'#fff'}  stroke={'#fff'}/> ,
}

export default function RecentActivity() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recent Activity</Text>

      <View style={styles.list}>
        {RecentActivityData.map((item) => (
          <LinearGradient
            key={item.id}
            colors={colors.gradientPrimary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.cardBorder}
          >
            <View style={styles.card}>
              <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />

              <View style={styles.textContainer}>
                <Text style={styles.title}>
                  {item.name} {item.message}
                </Text>
                <Text style={styles.timeAgo}>{item.timeAgo}</Text>
              </View>

              <LinearGradient
                colors={colors.gradientPrimary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconBadge}
              >
                {typeToIcon[item.type]}
              </LinearGradient>
            </View>
          </LinearGradient>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xxl,
  },
  heading: {
    fontSize: typography.subtitle,
    fontWeight: '500',
    marginBottom: spacing.md,
  },
  list: {
    gap: spacing.md,
  },
  cardBorder: {
    borderRadius: 12,
    padding: 2,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: spacing.md,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: spacing.md,
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '500',
    fontSize: typography.body,
    marginBottom: spacing.xs,
  },
  timeAgo: {
    fontSize: typography.xsmall,
    color: '#888',
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },

})
