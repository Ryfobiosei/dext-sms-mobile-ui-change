module.exports = function (api) {
  api.cache(true);

  const presets = ['babel-preset-expo'];
  if (process.env.NODE_ENV !== 'test') {
    presets.push('nativewind/babel');
  }

  return {
    presets,
  };
};
