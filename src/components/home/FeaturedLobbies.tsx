import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import typography from '../../constants/typography'
import spacing from '../../constants/spacing'
import LinearGradient from 'react-native-linear-gradient'
import colors from '../../constants/color'
import { FeaturedLobbiesData } from '../../constants/home/featuredLobbiesData'

interface FeaturedLobbieType {
  id: string;
  title: string;
  description: string;
  image: string;
  membersCount: number;
  members: string[];
}

export default function FeaturedLobbies() {

  const renderCard = (item: FeaturedLobbieType) => {
    return (
      <LinearGradient
        colors={colors.gradientPrimary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBorder}
      >
        <View style={styles.innerContainer}>
          <Image source={{ uri: item.image }} style={styles.bannerImage} resizeMode='cover' />

          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>

          <View style={styles.footer}>
            <View style={styles.avatars}>
              {item.members.map((avatar, index) => (
                  <Image
                  key={index}
                  source={{ uri: avatar }}
                  style={[styles.avatar, { marginLeft: index === 0 ? 0 : -10 }]}
                />
              ))}
            </View>
            <Text style={styles.memberCount}>{item.membersCount} members</Text>
          </View>
        </View>
      </LinearGradient>
    )
  }

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.heading}>Featured Lobbies</Text>
        <Text>See all</Text>
      </View>

      <FlatList
        data={FeaturedLobbiesData}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => renderCard(item)}
        contentContainerStyle={{ gap: 20 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md
  },
  heading: {
    fontWeight: '500',
    fontSize: typography.subtitle
  },
  gradientBorder: {
    borderRadius: 12,
    padding: 2,
  },
  innerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: spacing.md,
    width: 280,
  },
  bannerImage: {
    height: 140,
    width: '100%',
    borderRadius: 10,
    marginBottom: spacing.sm,
  },
  title: {
    fontWeight: '600',
    fontSize: typography.subtitle,
    marginBottom: 4,
  },
  description: {
    color: '#666',
    fontSize: typography.small,
    marginBottom: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  avatars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fff',
  },
  memberCount: {
    fontSize: typography.small,
    color: '#888',
  }
})
