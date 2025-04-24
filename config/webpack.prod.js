const glob = require('glob');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const SizePlugin = require('size-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');

function collectSafelist() {
  return {
    standard: ['safelisted', /^safelisted-/],
    // deep: [/^safelisted-deep-/],
    // greedy: [/^safelisted-greedy/],
  };
}

module.exports = {
  mode: 'production',
  performance: {
    hints: 'error',
    // in development mode the size of assets is bigger than in production
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
          compress: {
            drop_console: true,
          },
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
        },
      },
    },
    runtimeChunk: {
      name: 'runtime',
    },
  },
  plugins: [
    new PurgeCSSPlugin({
      paths: glob.sync('src/**/*', { nodir: true }),
      safelist: collectSafelist,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public/',
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    new SizePlugin(),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'server',
    //   analyzerPort: 8888,
    //   openAnalyzer: true,
    //   // analyzerMode: 'disabled',
    //   // generateStatsFile: true,
    // }),
    // new GitRevisionPlugin(),
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version(),
      test: /\.css$/, // Only show in css file
    }),
  ],
};
