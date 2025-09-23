import { ImageSourcePropType } from 'react-native';

export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  imageSource: ImageSourcePropType;
}

export const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    title: "Welcome to \nPop the Balloon",
    description: "Experience a unique dating journey where connections are made through shared interests and playful interactions.",
    imageSource: require('../../assets/images/onboarding/onboarding1.png'), 
  },
  {
    id: 2,
    title: "Swipe to Pop Balloons",
    description: "Swipe to pop balloons and reveal profiles. Match with someone you like and start chatting!",
    imageSource: require('../../assets/images/onboarding/onboarding2.png'), 
  },
  {
    id: 3,
    title: "Join Dating Lobbies",
    description: "Play group dating games, host-led contests, and eliminate players until only one remains.",
    imageSource: require('../../assets/images/onboarding/onboarding3.png'), 
  },
];
