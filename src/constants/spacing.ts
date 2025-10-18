import { Dimensions, Platform } from 'react-native';

const BASE_WIDTH = 375;

const { width, height } = Dimensions.get('window');

// const scale = width / BASE_WIDTH;

// const scaled = (size: number): number => Math.round(size * scale);

export interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
  large: number;
  xlarge: number;
  jumbo: number;

  screenWidth: number;
  screenHeight: number;

  screenPadding: number;
}

// const spacing: Spacing = {
//   xs: scaled(4),
//   sm: scaled(8),
//   md: scaled(12),
//   lg: scaled(16),
//   xl: scaled(20),
//   xxl: scaled(24),
//   xxxl: scaled(32),

//   large: scaled(40),
//   xlarge: scaled(48),
//   jumbo: scaled(64),

//   screenHeight: height,
//   screenWidth: width,

//   screenPadding: scaled(20),
// };


const spacing: Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,

  large: 40,
  xlarge: 48,
  jumbo: 64,

  screenHeight: height,
  screenWidth: width,

  screenPadding: 20,
};

export default spacing;
