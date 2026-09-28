const {getDefaultConfig} = require('expo/metro-config');
const {withNativeWind} = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// For web previews, route all react-native imports through react-native-web.
const originalResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform, info) => {
  if (platform === 'web' && moduleName === 'react-native') {
    return context.resolveRequest(context, 'react-native-web', platform, info);
  }
  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform, info);
  }
  return context.resolveRequest(context, moduleName, platform, info);
};

module.exports = withNativeWind(config, {input: './global.css'});
