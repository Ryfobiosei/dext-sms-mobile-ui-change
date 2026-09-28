module.exports = {
  preset: '@react-native/jest-preset',
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|nativewind|react-native-css-interop|react-native-svg|react-native-safe-area-context|@react-native-async-storage|expo|expo-.*)/)',
  ],
};
