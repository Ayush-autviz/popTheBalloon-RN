import React from 'react'
import { Image, ImageSourcePropType, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import colors from '../../constants/color'
import spacing from '../../constants/spacing'
import typography from '../../constants/typography'
import LinearGradient from 'react-native-linear-gradient'
import Button from '../../components/ui/Button'
import TextGradient from '../../components/ui/TextGradient'

type DetailRowProps = { label: string; value: string }
const DetailRow = ({ label, value }: DetailRowProps) => (
  <View style={styles.detailRow}>
    <View style={{ width: '40%' }}>
      <Text style={styles.detailLabel}>{label}</Text>
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  </View>
)

type AvatarStackProps = { images: ImageSourcePropType[] }
const AvatarStack = ({ images }: AvatarStackProps) => (
  <View style={styles.avatarStack}>
    {images.map((img, idx) => (
      <Image key={idx} source={img} style={[styles.avatar, { left: idx * 30 }]} />
    ))}
  </View>
)

export default function LobbyDetails() {
  return (
    <SafeAreaView style={styles.main}>
      <Header text='Dating Lobby' />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        <View style={styles.hostRow}>
        <View style={{position: 'relative',width: 100,height: 100,}}>
          <Image source={require('../../assets/images/people/Sarah.png')} style={styles.hostAvatar} resizeMode='cover'/>
          <Button text='Ethan' style={{position: 'absolute', left: '50%' , bottom: 0, paddingVertical: spacing.xs, paddingHorizontal: spacing.lg, transform: [{ translateX: '-50%' },]}} />
        </View>
          <View style={{ marginLeft: spacing.md }}>
            <Text style={styles.hostName}>Ethan_101 • Host</Text>
            <Text style={styles.hostMeta}>4.8 · 123 reviews</Text>
          </View>
        </View>

        <Text style={styles.description}>
          Welcome to my lobby! We'll be playing a fun game of 'Two Truths and a Lie' to get to know each other. Let's have some laughs and maybe find a spark!
        </Text>

        <AvatarStack images={[
          require('../../assets/images/people/person2.png'),
          require('../../assets/images/people/person3.png'),
          require('../../assets/images/people/person4.png'),
          require('../../assets/images/people/person1.png'),
          require('../../assets/images/people/person6.png'),

        ]} />

        <Text style={styles.sectionTitle}>Question Preview</Text>
        <Text style={styles.previewText}>What's your favorite travel destination and why?</Text>

        <Text style={styles.sectionTitle}>Lobby Details</Text>
        <View style={styles.detailsCard}>
          <DetailRow label='Entry Requirements' value={`Age 25–35, \nVerified Profile`} />
          <DetailRow label='Starts In' value='00h 15m 30s' />
          <DetailRow label='Participants' value='5/10' />
          <DetailRow label='Interest' value='5/10' />
          <DetailRow label='Generic Questions' value='5/5' />
          <DetailRow label='Entry Fee' value='10 coins' />
        </View>

        <LinearGradient colors={colors.gradientPrimary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.shareBorder}>
          <View style={styles.shareCard}>
            <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextGradient
                    style={styles.gradientText}
                    locations={[0, 1]}
                    colors={colors.gradientPrimary}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    text={'Share with family\nand friends'}
                />
                <Image source={require('../../assets/images/datingLobby/friends.png')} resizeMode='contain' style={{height: 'auto', width: '40%' }} />
                </View>
              <View style={{ flexDirection: 'row', marginTop: spacing.sm, gap: 5}}>
                <Button text='Share as Participant' style={{paddingHorizontal: spacing.sm, paddingVertical: spacing.sm, flex: 1, marginRight: spacing.xs}} textStyle={{fontSize: typography.body}} />
                <Button variant='grey' text='Share as Interest' style={{paddingHorizontal: spacing.sm, paddingVertical: spacing.sm, flex: 1, marginLeft: spacing.xs}} textStyle={{fontSize: typography.body}} />
              </View>



            </View>
          </View>
        </LinearGradient>

        <Text style={styles.sectionTitle}>Lobby Rules</Text>
        <Text style={styles.rulesText}>
          Be respectful, have fun, and no inappropriate content. Violators will be removed.
        </Text>

        <View style={{ height: spacing.lg }} />
        <Button variant='gradient' text='Join As Participant' style={{paddingVertical: spacing.sm}} />
        <Button variant='grey' text='Join As Interest'  style={{paddingVertical: spacing.sm}}/>
        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.background
  },
  container: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.xxl
  },
  hostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg
  },
  hostAvatar: {
    width: 100,
    height: 100,
    borderRadius: spacing.jumbo
  },
  hostName: {
    fontSize: typography.small,
    color: colors.textSecondary
  },
  hostMeta: {
    fontSize: typography.small,
    color: colors.textSecondary,
    marginTop: 2
  },
  description: {
    fontSize: typography.body,
    marginTop: spacing.md,
    color: colors.textPrimary,
  },
  avatarStack: {
    height: 36,
    marginVertical: spacing.md
  },
  avatar: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    borderColor: colors.background,
    borderWidth: 2
  },
  sectionTitle: {
    marginTop: spacing.md,
    fontWeight: '700',
    fontSize: typography.subtitle,
    color: colors.textPrimary
  },
  previewText: {
    marginVertical: spacing.sm,
    color: colors.textPrimary
  },
  detailsCard: {
    marginTop: spacing.md,
    paddingVertical: spacing.md
  },
  detailRow: {
    flexDirection: 'row',
    paddingVertical: spacing.lg,
    borderTopColor: colors.gray200,
    borderTopWidth: 1
  },
  detailLabel: {
    color: colors.textSecondary
  },
  detailValue: {
    color: colors.textPrimary,
  },
  shareBorder: {
    marginVertical: spacing.xl,
    borderRadius: 16,
    padding: 1
  },
  shareCard: {
    borderRadius: 15,
    backgroundColor: colors.background,
    padding: spacing.lg,
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center'
  },
  shareTitle: {
    fontWeight: '700',
    fontSize: typography.subtitle,
    color: colors.textPrimary
  },
  shareAvatarLarge: {
    width: 56,
    height: 56,
    borderRadius: 28
  },
  shareAvatarRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm
  },
  shareAvatarSmall: {
    width: 28,
    height: 28,
    borderRadius: 14
  },
  rulesText: {
    marginTop: spacing.sm,
    color: colors.textPrimary
  },
  gradientText: {
    fontWeight: '500',
    fontSize: typography.secondaryTitle,
    lineHeight: spacing.xxxl
  }
})


