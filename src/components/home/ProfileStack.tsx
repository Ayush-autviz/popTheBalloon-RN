import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { RotateCcw } from 'lucide-react-native';
import SwipeableProfileCard from './SwipeableProfileCard';
import MatchScreen from '../match/MatchScreen';
import { discoverProfiles, ignoreProfile, popProfile, starProfile, rewindLastSwipe } from '../../api/services/discovery';
import type { Profile, SwipeActionResponse } from '../../api/types/discovery';
import colors from '../../constants/color';
import spacing from '../../constants/spacing';
import typography from '../../constants/typography';

interface ProfileStackProps {
  onMatch?: (profile: Profile, isSuperLike?: boolean) => void;
  onEmpty?: () => void;
}

export default function ProfileStack({ onMatch, onEmpty }: ProfileStackProps) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [swipeHistory, setSwipeHistory] = useState<Array<{ profile: Profile; action: string }>>([]);
  const [showMatchScreen, setShowMatchScreen] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);
  const [isSuperLikeMatch, setIsSuperLikeMatch] = useState(false);

  const loadProfiles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await discoverProfiles({ limit: 10 });
      console.log('response', response);
      setProfiles(response.data?.profiles || []);
      setCurrentIndex(0);
    } catch (err) {
      setError('Failed to load profiles');
      console.error('Error loading profiles:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  const handleSwipeAction = useCallback(async (action: 'ignore' | 'pop' | 'star', profileId: string) => {
    const currentProfile = profiles[currentIndex];
    if (!currentProfile) return;

    try {
      let response: SwipeActionResponse;
      
      switch (action) {
        case 'ignore':
          response = await ignoreProfile({ profileId });
          break;
        case 'pop':
          response = await popProfile({ profileId });
          break;
        case 'star':
          response = await starProfile({ profileId });
          break;
      }

      // Add to swipe history
      setSwipeHistory(prev => [...prev, { profile: currentProfile, action }]);

      // Check for match
      if (response.isMatch) {
        setMatchedProfile(currentProfile);
        setIsSuperLikeMatch(action === 'star');
        setShowMatchScreen(true);
        onMatch?.(currentProfile, action === 'star');
      }

      // Move to next profile
      moveToNextProfile();
    } catch (err) {
      console.error(`Error performing ${action}:`, err);
      Alert.alert('Error', `Failed to ${action} profile`);
    }
  }, [profiles, currentIndex, onMatch]);

  const handleSwipeLeft = useCallback((profileId: string) => {
    handleSwipeAction('ignore', profileId);
  }, [handleSwipeAction]);

  const handleSwipeRight = useCallback((profileId: string) => {
    handleSwipeAction('pop', profileId);
  }, [handleSwipeAction]);

  const handleSwipeUp = useCallback((profileId: string) => {
    handleSwipeAction('star', profileId);
  }, [handleSwipeAction]);

  const moveToNextProfile = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= profiles?.length) {
      // No more profiles, trigger empty state
      onEmpty?.();
      // Reload profiles
      loadProfiles();
    } else {
      setCurrentIndex(nextIndex);
    }
  }, [currentIndex, profiles?.length, onEmpty, loadProfiles]);

  const handleRewind = useCallback(async () => {
    if (swipeHistory.length === 0) {
      Alert.alert('No Swipes', 'No swipes to rewind');
      return;
    }

    try {
      const response = await rewindLastSwipe();
      if (response.success && response.profile) {
        // Add the profile back to the beginning of the stack
        setProfiles(prev => [response.profile!, ...prev]);
        setCurrentIndex(0);
        // Remove the last swipe from history
        setSwipeHistory(prev => prev.slice(0, -1));
      }
    } catch (err) {
      console.error('Error rewinding:', err);
      Alert.alert('Error', 'Failed to rewind last swipe');
    }
  }, [swipeHistory.length]);

  const handleCloseMatchScreen = useCallback(() => {
    setShowMatchScreen(false);
    setMatchedProfile(null);
    setIsSuperLikeMatch(false);
  }, []);

  const handleSendMessage = useCallback(() => {
    // Navigate to chat or handle message sending
    console.log('Send message to:', matchedProfile?._id);
    handleCloseMatchScreen();
  }, [matchedProfile, handleCloseMatchScreen]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading profiles...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadProfiles}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (profiles.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No more profiles</Text>
        <Text style={styles.emptySubtext}>Check back later for new matches!</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadProfiles}>
          <Text style={styles.retryButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentProfile = profiles[currentIndex];
  const nextProfile = profiles[currentIndex + 1];

  return (
    <View style={styles.container}>
      {/* Match screen overlay */}
      {showMatchScreen && matchedProfile && (
        <MatchScreen
          profile={matchedProfile}
          isSuperLike={isSuperLikeMatch}
          onClose={handleCloseMatchScreen}
          onSendMessage={handleSendMessage}
        />
      )}

      {/* Rewind button */}
      {swipeHistory.length > 0 && (
        <TouchableOpacity style={styles.rewindButton} onPress={handleRewind}>
          <RotateCcw size={24} color={colors.primary} />
        </TouchableOpacity>
      )}

      {/* Profile cards stack */}
      <View style={styles.cardContainer}>
        {/* Next card (background) */}
        {nextProfile && (
          <View style={[styles.card, styles.nextCard]}>
            <SwipeableProfileCard
              profile={nextProfile}
              onSwipeLeft={() => {}}
              onSwipeRight={() => {}}
              onSwipeUp={() => {}}
              onButtonPress={() => {}}
              isTopCard={false}
            />
          </View>
        )}

        {/* Current card (foreground) */}
        {currentProfile && (
          <View style={[styles.card, styles.currentCard]}>
            <SwipeableProfileCard
              profile={currentProfile}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
              onSwipeUp={handleSwipeUp}
              onButtonPress={handleSwipeAction}
              isTopCard={true}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: typography.body,
    color: colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  errorText: {
    fontSize: typography.body,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  emptyText: {
    fontSize: typography.title,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  emptySubtext: {
    fontSize: typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 25,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: typography.body,
    fontWeight: '600',
  },
  rewindButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContainer: {
    flex: 1,
    position: 'relative',
  },
  card: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  currentCard: {
    zIndex: 2,
  },
  nextCard: {
    zIndex: 1,
    transform: [{ scale: 0.95 }],
    opacity: 0.8,
  },
});
