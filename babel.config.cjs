// eslint-disable-next-line no-undef
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // This plugin strips Flow type annotations, preventing syntax errors
      '@babel/plugin-transform-flow-strip-types',
    ],
  };
};