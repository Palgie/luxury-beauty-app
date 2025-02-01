export const theme = {
  colors: {
    brand: 'hsl(204, 18%, 16%)',
    brandContent: 'hsl(60, 25%, 98%)',
    primary: 'hsl(204, 18%, 16%)',
    secondary: '#FFFFFF',
    accent: '#FF69B4',
    error: '#FF0000',
    text: {
      primary: 'hsl(204, 18%, 16%)',
      secondary: '#666666',
      inverse: '#FFFFFF',
    },
    background: {
      main: '#FFFFFF',
      light: 'hsl(60, 25%, 98%)',
    },
    border: '#EEEEEE',
  },
  typography: {
    fontFamily: {
      serif: 'PlayfairDisplay',
      serifBold: 'PlayfairDisplay-Bold',
      sans: 'Inter',
      sansMedium: 'Inter-Medium',
    },
    fontSize: {
      h1: 24,
      h2: 20,
      h3: 18,
      body: 16,
      caption: 14,
      small: 12,
    },
    fontWeight: {
      regular: '400',
      medium: '600',
      bold: '700',
    },
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
    pill: 25,
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
  },
} as const;

export type Theme = typeof theme;
