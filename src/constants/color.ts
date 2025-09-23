type ColorPalette = {
    // Brand
    primary: string
    secondary: string
    accent: string
  
    // Backgrounds
    background: string
    backgroundSecondary: string
    surface: string
  
    // Text
    textPrimary: string
    textSecondary: string
    textTertiary: string
    textInverse: string
  
    // Borders / Dividers
    border: string
    divider: string
  
    // UI States
    disabled: string
    placeholder: string
  
    // Status
    success: string
    warning: string
    error: string
    info: string
  
    // Gradients
    gradientPrimary: string[]
    gradientAccent: string[]
    gradientLight: string[]
  
    // Grayscale
    gray100: string
    gray200: string
    gray300: string
    gray400: string
    gray500: string
    gray600: string
    gray700: string
    gray800: string
    gray900: string
  
    // Transparency
    overlayLight: string
    overlayMedium: string
    overlayDark: string
  }
  

const colors: ColorPalette = {
  // Brand
  primary: '#B02D9F',
  secondary: '#DE6F41',
  accent: '#FF6161',

  // Backgrounds
  background: '#FFFFFF',
  backgroundSecondary: '#FDF5F7',
  surface: '#FAFAFA',

  // Text
  textPrimary: '#121717',
  textSecondary: '#617D8A',
  textTertiary: '#DE6F41',
  textInverse: '#FFFFFF',

  // Borders / Dividers
  border: '#BABABA',
  divider: '#CCCCCC',

  // UI States
  disabled: '#CCCCCC',
  placeholder: '#BDBDBD',

  // Status
  success: '#27AE60',
  warning: '#F2C94C',
  error: '#EB5757',
  info: '#2D9CDB',

  // Gradients
  gradientPrimary: ['#B02D9F', '#DE6F41'],
  gradientAccent: ['#FA00FF', '#FF6161'],
  gradientLight: ['#FEFEFE', '#EFEFFF'],

  // Grayscale
  gray100: '#FAFAFA',
  gray200: '#F0F0F0',
  gray300: '#E0E0E0',
  gray400: '#CCCCCC',
  gray500: '#999999',
  gray600: '#666666',
  gray700: '#4D4D4D',
  gray800: '#333333',
  gray900: '#1A1A1A',

  // Transparency
  overlayLight: 'rgba(0, 0, 0, 0.05)',
  overlayMedium: 'rgba(0, 0, 0, 0.3)',
  overlayDark: 'rgba(0, 0, 0, 0.6)',
}

export default colors
