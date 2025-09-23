import { ImageSourcePropType } from 'react-native';

export interface imageOverlayData {
  id: number;
  title: string;
  description: string;
  imageSource: ImageSourcePropType;
}

export const imageOverlayData: imageOverlayData[] = [
  {
    id: 1,
    title: "Unlock Premium Features",
    description: "Get unlimited free pops, ballon packs, lobby entry coins, and special reveals.",
    imageSource: require('../../assets/images/onboarding/background.png'), 
  },
  {
    id: 2,
    title: "Unlock Partners Features",
    description: "Get unlimited free pops, create lobby, ballon packs, lobby entry coins, and special reveals.",
    imageSource: require('../../assets/images/partnerBackground.png'), 
  },
];
