const { merge } = require('webpack-merge');
const commonConfig = require('./config/webpack.common');
const devConfig = require('./config/webpack.dev');
const prodConfig = require('./config/webpack.prod');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  const modeConfig = isProd ? prodConfig : devConfig;

  return merge(commonConfig, modeConfig);
};
