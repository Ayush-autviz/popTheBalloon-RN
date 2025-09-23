import { Dimensions } from 'react-native';

const BASE_WIDTH = 375;
const { width } = Dimensions.get('window');
const scale = width / BASE_WIDTH;

const scaled = (size: number): number => Math.round(size * scale);

export interface Typography {
  small: number;
  body: number;
  subtitle: number;
  secondaryTitle: number;
  title: number;
  headline: number;
  display: number;
}

const typography: Typography = {
  small: scaled(12),
  body: scaled(14),
  subtitle: scaled(16),
  secondaryTitle: scaled(20),
  title: scaled(24),
  headline: scaled(28),
  display: scaled(32),
};

export default typography;
