const paths = require('./paths');

module.exports = {
  mode: 'development',
  cache: false,
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: paths.build,
    },
    compress: true,
    // open: true, // open in default browser
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: true,
      },
    },
    port: 3636,
  },
  performance: {
    hints: 'warning',
    // in development mode the size of assets is bigger than in production
    maxEntrypointSize: 10485760,
    maxAssetSize: 10485760,
  },
};
