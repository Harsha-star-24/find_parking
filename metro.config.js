const { getDefaultConfig } = require('@react-native/metro-config');

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);
  const { assetExts } = defaultConfig.resolver;
  return {
    ...defaultConfig,
    resolver: {
      ...defaultConfig.resolver,
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      assetExts: [...assetExts, 'png', 'jpg', 'jpeg', 'gif', 'bmp', 'ttf', 'otf'],
    },
    transformer: {
      ...defaultConfig.transformer,
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
  };
})();
