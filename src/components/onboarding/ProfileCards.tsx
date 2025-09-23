// src/components/ProfileCardList.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import profileCardData, { Profile } from '../../constants/onboarding/profileCardData';
import spacing from '../../constants/spacing';
import typography from '../../constants/typography';
import { Cross, Heart, X } from 'lucide-react-native';


const CARD_WIDTH = (spacing.screenWidth / 2) - spacing.screenPadding - spacing.sm;


interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <View style={styles.card}>
      <Image source={profile.image} resizeMode='cover' style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.name}>{profile.name}, {profile.age}</Text>
        <View style={styles.actions}>
          <View style={styles.leftAction}>
            
          <X color={'#fff'} />
          </View>
          <View style={styles.rightAction}>
          <Heart color={'#fff'} fill="#fff" />
          </View>
        </View>
      </View>
    </View>
  );
};

const ProfileCardList = () => {

  return (
    <FlatList
      data={profileCardData}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <ProfileCard
          profile={item}
        />
      )}
    />
  );
};

export default ProfileCardList;

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.lg,
  },
  card: {
    width: CARD_WIDTH,
    aspectRatio: 1,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: spacing.md,
    marginBottom: spacing.md
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  name: {
    color: '#fff',
    fontSize: typography.small,
    fontWeight: '700',
    marginBottom: spacing.sm,
    marginLeft: spacing.md
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  leftAction: {
    borderRightWidth: 0.5, borderRightColor: '#fff', flex: 1,alignItems: 'center'
  },
  rightAction: {
    borderLeftWidth: 0.5, borderLeftColor: '#fff', flex: 1,alignItems: 'center'
  }
});
