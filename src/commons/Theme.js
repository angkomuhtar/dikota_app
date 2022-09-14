import {extendTheme} from 'native-base';

export const theme = extendTheme({
  fontConfig: {
    Mulish: {
      100: {
        normal: 'Mulish-ExtraLight',
      },
      200: {
        normal: 'Mulish-ExtraLight',
      },
      300: {
        normal: 'Mulish-Light',
      },
      400: {
        normal: 'Mulish-Regular',
      },
      500: {
        normal: 'Mulish-Medium',
      },
      600: {
        normal: 'Mulish-SemiBold',
      },
      700: {
        normal: 'Mulish-Bold',
      },
      800: {
        normal: 'Mulish-ExtraBold',
      },
      900: {
        normal: 'Mulish-Black',
      },
    },
  },
  colors: {
    primary: {
      900: '#008080',
      800: '#2F80ED',
      700: '#2FCBC7',
      600: '#35DFD8',
      500: '#3AF2E8',
      400: '#00FFFF',
      300: '#EAF1FF',
      200: '#2EC8EA',
      100: '#2AB6D5',
      50: '#26a5c2',
    },
    gray: {
      //   00: '#FFFFFF',
      50: '#F5F7FA',
      100: '#E4E7EB',
      200: '#CBD2D9',
      300: '#7B8794',
      400: '#323F4B',
    },
    warning: {
      //   00: '#FFFFFF',
      100: '#F9EDC7',
      200: '#F3DB90',
      300: '#E7B820',
      400: '#775E0D',
    },
    danger: {
      //   00: '#FFFFFF',
      100: '#FCCECE',
      200: '#F99C9C',
      300: '#e02b2b',
      400: '#8D0909',
    },
    succees: {
      //   00: '#FFFFFF',
      100: '#CBF1D9',
      200: '#97E3B3',
      300: '#34C369',
      400: '#1A6234',
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: 'Mulish',
    body: 'Mulish',
    mono: 'Mulish',
    mulish: 'Mulish',
  },
});
