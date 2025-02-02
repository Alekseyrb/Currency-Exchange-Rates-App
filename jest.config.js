module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-navigation|react-native-paper)/)',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};
