import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Heart, X, MessageCircle } from 'lucide-react-native';
import colors from '../../constants/color';
import spacing from '../../constants/spacing';
import typography from '../../constants/typography';
import type { Profile } from '../../api/types/discovery';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface MatchScreenProps {
  profile: Profile;
  isSuperLike?: boolean;
  onClose: () => void;
  onSendMessage?: () => void;
}

export default function MatchScreen({
  profile,
  isSuperLike = false,
  onClose,
  onSendMessage,
}: MatchScreenProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const heartAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Heart animation
    setTimeout(() => {
      Animated.sequence([
        Animated.timing(heartAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(heartAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1000);
  }, []);

  const getPrimaryPhoto = () => {
    const primaryPhoto = profile.profilePhotos.find(photo => photo.isPrimary);
    return primaryPhoto || profile.profilePhotos[0];
  };

  const heartScale = heartAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });

  const heartOpacity = heartAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.overlay}>
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Background gradient */}
        <View style={styles.background} />

        {/* Match content */}
        <View style={styles.content}>
          {/* Hearts animation */}
          <Animated.View
            style={[
              styles.heartsContainer,
              {
                opacity: heartOpacity,
                transform: [{ scale: heartScale }],
              },
            ]}
          >
            <Heart size={60} color="#ff6b6b" fill="#ff6b6b" />
          </Animated.View>

          {/* Match title */}
          <Text style={styles.matchTitle}>
            {isSuperLike ? 'Super Like Match!' : "It's a Match!"}
          </Text>

          <Text style={styles.matchSubtitle}>
            You and {profile.firstName} liked each other
          </Text>

          {/* Profile photos */}
          <View style={styles.photosContainer}>
            <View style={styles.photoContainer}>
              <Image
                source={
                  getPrimaryPhoto()?.signedUrl
                    ? { uri: getPrimaryPhoto()?.signedUrl }
                    : require('../../assets/images/people/Sarah.png')
                }
                style={styles.photo}
              />
            </View>
            <View style={styles.photoContainer}>
              <Image
                source={require('../../assets/images/people/Sarah.png')}
                style={styles.photo}
              />
            </View>
          </View>

          {/* Action buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color="#fff" />
            </TouchableOpacity>

            {onSendMessage && (
              <TouchableOpacity style={styles.messageButton} onPress={onSendMessage}>
                <MessageCircle size={24} color="#fff" />
                <Text style={styles.messageButtonText}>Send Message</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.7,
    borderRadius: 20,
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  heartsContainer: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
  },
  matchTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: spacing.sm,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  matchSubtitle: {
    fontSize: typography.body,
    color: '#fff',
    textAlign: 'center',
    marginBottom: spacing.xl,
    opacity: 0.9,
  },
  photosContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  photoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
    marginHorizontal: spacing.sm,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  closeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 25,
  },
  messageButtonText: {
    color: '#fff',
    fontSize: typography.body,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
});
