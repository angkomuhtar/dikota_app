module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@navigation': './src/navigation',
          '@assets': './src/assets',
          '@screens': './src/screens',
          '@commons': './src/commons',
          '@components': './src/components',
          '@redux': './src/redux',
        },
      },
    ],
  ],
};
