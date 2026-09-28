module.exports = {
  root: true,
  extends: '@react-native',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      configFile: false,
    },
  },
  ignorePatterns: [
    'node_modules/',
    'android/',
    'ios/',
    'dist/',
    'build/',
    '*.config.js',
    'index.js',
    'tailwind.config.js',
  ],
};
