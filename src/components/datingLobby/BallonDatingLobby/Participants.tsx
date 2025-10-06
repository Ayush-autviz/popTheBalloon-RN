import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../constants/color';
import typography from '../../../constants/typography';
import spacing from '../../../constants/spacing';
import Button from '../../ui/Button';
import { Mic, MicOff, MessageCircle, Heart, X, MessageSquareMore } from 'lucide-react-native';
import { SvgXml } from 'react-native-svg';
import { BallonIcon, PopIcon } from '../../../constants/svg';

export interface Participant {
  id: string;
  name: string;
  age: number;
  profileImage: any;
  status: 'mic' | 'micOff' | 'chat';
  hasNotification?: boolean;
  isLiked?: boolean;
  isDismissed?: boolean;
  hasInterests?: boolean;
}

interface ParticipantsProps {
  participants: Participant[];
  onLike?: (participantId: string) => void;
  onDismiss?: (participantId: string) => void;
  onParticipantPress?: (participantId: string) => void;
}

export default function Participants({ 
  participants, 
  onLike, 
  onDismiss, 
  onParticipantPress 
}: ParticipantsProps) {


    
  const renderStatusIcon = (status: string, hasNotification?: boolean) => {
    const iconSize = 22;
    
    return (
      <View style={styles.statusIconWrapper}>
        {status === 'mic' && (
          <Button
            icon={<Mic size={iconSize} color={colors.textTertiary} />}
            style={styles.micButton}
            innerStyle={styles.IconInner}
            variant="outline"
          />
        )}
        {status === 'micOff' && (
          <Button
            icon={<MicOff size={iconSize} color={colors.gray500} />}
            style={styles.micOffButton}
            innerStyle={styles.IconInner}
            variant="ghost"
          />
        )}
        {status === 'chat' && (
          <Button
            icon={<MessageSquareMore size={iconSize} color={colors.textTertiary} />}
            style={styles.chatButton}
            innerStyle={styles.IconInner}
            variant="outline"
          />
        )}
        {hasNotification && <View style={styles.notificationDot} />}
      </View>
    );
  };

//   const renderActionButton = (
//     icon: React.ReactNode,
//     isActive: boolean,
//     onPress: () => void,
//     style?: any
//   ) => {
//     if (isActive) {
//       return (
//         <TouchableOpacity onPress={onPress} style={[styles.actionButton, styles.activeButton, style]}>
//           {icon}
//         </TouchableOpacity>
//       );
//     }

//     return (
//       <TouchableOpacity onPress={onPress} style={[styles.actionButton, styles.inactiveButton, style]}>
//         {icon}
//       </TouchableOpacity>
//     );
//   };

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.heading}>Participants ({participants.length})</Text>
      </View>

      <View style={styles.grid}>
        {participants.map((participant) => (
          <TouchableOpacity
            key={participant.id}
            style={styles.participantCard}
            onPress={() => onParticipantPress?.(participant.id)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#FEFEFE', '#EFEFFF']}
              style={styles.cardContent}
            >
              <View style={styles.statusIconWrapper}>
                  {renderStatusIcon(participant.status, participant.hasNotification)}
                </View>
              <View style={styles.profileImageContainer}>
                <Image source={participant.profileImage} style={styles.profileImage} />
              

              {participant.hasInterests && (
                <View style={styles.interestsTagContainer}>
                  <LinearGradient
                    colors={colors.gradientPrimary}
                    style={styles.interestsTag}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.interestsText}>Interests</Text>
                  </LinearGradient>
                </View>
              )}
              </View>

              
              <Text style={styles.participantName}>{participant.name}</Text>
              <Text style={styles.participantAge}>Age {participant.age}</Text>
              
            </LinearGradient>
            <View style={styles.actionButtons}>
                <Button icon={<SvgXml xml={BallonIcon} height={20} width={20} />} onPress={() => onLike?.(participant.id)} style={styles.likeButton} />
                <Button icon={<X size={16} color={colors.textSecondary} />} onPress={() => onDismiss?.(participant.id)} variant="ghost" style={styles.dismissButton} />
              </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: spacing.md,
  },
  header: {
    marginBottom: spacing.lg,
  },
  heading: {
    fontSize: typography.secondaryTitle,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  participantCard: {
    width: '48%',
    borderRadius: spacing.lg,
    marginBottom: spacing.xxxl,
    borderWidth: 2,
    borderColor: '#E5DBDE',
  },
  cardContent: {
    padding: spacing.md,
    alignItems: 'center',
    borderRadius: spacing.lg,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: spacing.sm,
    alignSelf: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  statusIconWrapper: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
  IconInner: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: spacing.jumbo,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButton: {
    borderRadius: spacing.jumbo,
    marginTop: 0,
    shadowColor: colors.gray800,
  },
  micOffButton: {
    width: spacing.large,
    height: spacing.large,
    borderRadius: spacing.jumbo,
    marginTop: 0,
    backgroundColor: colors.gray200,
  },
  chatButton: {
    borderRadius: spacing.jumbo,
    marginTop: 0,
  },
  notificationDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: spacing.sm,
    height: spacing.sm,
    borderRadius: spacing.jumbo,
    backgroundColor: colors.error,
    zIndex: 1000,
  },
  interestsTagContainer: {
    position: 'absolute',
    bottom: -10,
  },
  interestsTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.sm,
  },
  interestsText: {
    color: colors.textInverse,
    fontSize: typography.xsmall,
    fontWeight: '500',
  },
  participantName: {
    fontSize: typography.subtitle,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: spacing.xs,
  },
  participantAge: {
    fontSize: typography.small,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    position: 'absolute',
    bottom: -20,
    left: 0,
    right: 0,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray300,
    backgroundColor: colors.background,
  },
  activeButton: {
    backgroundColor: colors.error,
    borderColor: colors.error,
  },
  inactiveButton: {
    backgroundColor: colors.background,
    borderColor: colors.gray300,
  },
  likeButton: {
    paddingHorizontal: spacing.md,
    borderRadius: spacing.jumbo,
  },
  dismissButton: {
    borderRadius: spacing.jumbo,
    paddingHorizontal: spacing.md,
    borderWidth: 2,
    borderColor: colors.gray400,
    backgroundColor: colors.background,
  },
});
