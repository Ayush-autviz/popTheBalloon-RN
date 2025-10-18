import React, { useRef, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Check, MapPin, Star, X } from 'lucide-react-native';
import { SvgXml } from 'react-native-svg';
import { PopIcon } from '../../constants/svg';
import colors from '../../constants/color';
import spacing from '../../constants/spacing';
import typography from '../../constants/typography';
import type { Profile } from '../../api/types/discovery';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const SWIPE_THRESHOLD = screenWidth * 0.25;
const ROTATION_MULTIPLIER = 0.1;

interface SwipeableProfileCardProps {
  profile: Profile;
  onSwipeLeft: (profileId: string) => void;
  onSwipeRight: (profileId: string) => void;
  onSwipeUp: (profileId: string) => void;
  onButtonPress: (action: 'ignore' | 'pop' | 'star', profileId: string) => void;
  isTopCard: boolean;
}

export default function SwipeableProfileCard({
  profile,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onButtonPress,
  isTopCard,
}: SwipeableProfileCardProps) {
  const position = useRef(new Animated.ValueXY()).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  // Reset animation values when card becomes top card
  useEffect(() => {
    if (isTopCard) {
      position.setValue({ x: 0, y: 0 });
      rotate.setValue(0);
      scale.setValue(1);
      opacity.setValue(1);
    }
  }, [isTopCard, position, rotate, scale, opacity]);

  const panResponder = useMemo(() => 
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => {
        // Only allow swipe on top card and if there's meaningful movement
        const shouldSet = isTopCard && (Math.abs(gesture.dx) > 2 || Math.abs(gesture.dy) > 2);
        console.log('onMoveShouldSetPanResponder', { isTopCard, dx: gesture.dx, dy: gesture.dy, shouldSet });
        return shouldSet;
      },
      onPanResponderGrant: () => {
        position.setOffset({
          x: (position.x as any)._value,
          y: (position.y as any)._value,
        });
        position.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
        
        // Add rotation based on horizontal movement
        const rotationValue = gesture.dx * ROTATION_MULTIPLIER;
        rotate.setValue(rotationValue);
        
        // Add scale effect for vertical movement (super like)
        if (gesture.dy < 0) {
          const scaleValue = 1 + Math.abs(gesture.dy) / 1000;
          scale.setValue(Math.min(scaleValue, 1.1));
        } else {
          scale.setValue(1);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        position.flattenOffset();
        
        const { dx, dy } = gesture;
        
        // Check for super like (swipe up)
        if (dy < -SWIPE_THRESHOLD) {
          onSwipeUp(profile._id);
          animateCardOut('up');
          return;
        }
        
        // Check for left swipe (ignore)
        if (dx < -SWIPE_THRESHOLD) {
          onSwipeLeft(profile._id);
          animateCardOut('left');
          return;
        }
        
        // Check for right swipe (like)
        if (dx > SWIPE_THRESHOLD) {
          onSwipeRight(profile._id);
          animateCardOut('right');
          return;
        }
        
        // Return to center
        animateCardBack();
      },
    }), [isTopCard, profile._id, onSwipeLeft, onSwipeRight, onSwipeUp, position, rotate, scale]
  );

  const animateCardOut = (direction: 'left' | 'right' | 'up') => {
    const toValue = direction === 'up' 
      ? { x: 0, y: -screenHeight }
      : { x: direction === 'left' ? -screenWidth * 1.5 : screenWidth * 1.5, y: 0 };
    
    Animated.parallel([
      Animated.timing(position, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateCardBack = () => {
    Animated.parallel([
      Animated.spring(position, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }),
      Animated.spring(rotate, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }),
    ]).start();
  };

  const getPrimaryPhoto = () => {
    const primaryPhoto = profile.profilePhotos.find(photo => photo.isPrimary);
    return primaryPhoto || profile.profilePhotos[0];
  };

  const getLocationText = () => {
    if (profile.distance) {
      return `${Math.round(profile.distance)} miles away`;
    }
    if (profile.location) {
      return `${profile.location.city}, ${profile.location.state}`;
    }
    return 'Location not available';
  };

  const rotateInterpolate = rotate.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  const leftOpacity = position.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const rightOpacity = position.x.interpolate({
    inputRange: [0, SWIPE_THRESHOLD],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const upOpacity = position.y.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.card,
        {
          transform: [
            { translateX: position.x },
            { translateY: position.y },
            { rotate: rotateInterpolate },
            { scale: scale },
          ],
          opacity: opacity,
        },
      ]}
      {...(isTopCard ? panResponder.panHandlers : {})}
    >
      <ImageBackground
        source={
          getPrimaryPhoto()?.signedUrl
            ? { uri: getPrimaryPhoto()?.signedUrl }
            : require('../../assets/images/people/Sarah.png')
        }
        style={styles.image}
        imageStyle={{ borderRadius: 20 }}
      >
        {/* Swipe indicators - only show on top card */}
        {isTopCard && (
          <>
            <Animated.View style={[styles.swipeIndicator, styles.leftIndicator, { opacity: leftOpacity }]}>
              <X size={60} color="#ff4444" />
              <Text style={styles.indicatorText}>IGNORE</Text>
            </Animated.View>

            <Animated.View style={[styles.swipeIndicator, styles.rightIndicator, { opacity: rightOpacity }]}>
              <Check size={60} color="#4CAF50" />
              <Text style={styles.indicatorText}>LIKE</Text>
            </Animated.View>

            <Animated.View style={[styles.swipeIndicator, styles.upIndicator, { opacity: upOpacity }]}>
              <Star size={60} color="#FFD700" />
              <Text style={styles.indicatorText}>SUPER LIKE</Text>
            </Animated.View>
          </>
        )}

        {/* Profile info overlay */}
        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>
              {profile.firstName}, {profile.age}
            </Text>
            <View style={styles.distanceRow}>
              <MapPin size={typography.subtitle} color="#fff" />
              <Text style={styles.distance}>{getLocationText()}</Text>
            </View>
          </View>
          <Text style={styles.description} numberOfLines={3}>
            {profile.bio || 'No bio available'}
          </Text>
        </View>

        {/* Action buttons - only functional on top card */}
        {isTopCard && (
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.ignoreButton]}
              onPress={() => onButtonPress('ignore', profile._id)}
            >
              <X color={colors.textTertiary} size={24} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.popButton]}
              onPress={() => onButtonPress('pop', profile._id)}
            >
              <SvgXml xml={PopIcon} width={24} height={24} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.starButton]}
              onPress={() => onButtonPress('star', profile._id)}
            >
              <Star fill="#EFAC4E" color="#EFAC4E" size={24} />
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: screenWidth - spacing.screenPadding * 2 - 20,
    height: 450,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  swipeIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  leftIndicator: {
    transform: [{ translateX: -80 }, { translateY: -30 }],
  },
  rightIndicator: {
    transform: [{ translateX: 20 }, { translateY: -30 }],
  },
  upIndicator: {
    transform: [{ translateX: -30 }, { translateY: -80 }],
  },
  indicatorText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
  },
  infoContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.jumbo,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  name: {
    color: 'white',
    fontSize: typography.secondaryTitle,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    color: 'white',
    fontSize: typography.body,
    marginLeft: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    color: 'white',
    fontSize: typography.body,
    lineHeight: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  buttonRow: {
    position: 'absolute',
    bottom: -35,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
  },
  actionButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ignoreButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: colors.textTertiary,
  },
  popButton: {
    backgroundColor: colors.primary,
  },
  starButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#EFAC4E',
  },
});