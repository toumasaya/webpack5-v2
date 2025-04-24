const PugPlugin = require('pug-plugin');
const path = require('path');
const paths = require('./paths');

const sourceDirname = 'src/assets/';
const pugSourceDirname = './src/views/';

module.exports = {
  stats: 'minimal',
  entry: {
    index: pugSourceDirname + 'index.pug',
  },
  output: {
    path: paths.build,
    publicPath: 'auto',
    // output filename of scripts
    filename: 'js/[name].[contenthash:5].js',
    chunkFilename: 'js/[name].[id].js',
    clean: true,
  },
  resolve: {
    alias: {
      Views: paths.src + '/views/',
      Images: paths.src + '/assets/images/',
      Styles: paths.src + '/assets/sass/',
      Scripts: paths.src + '/assets/js/',
    },
  },
  plugins: [
    // enable processing of Pug files from entry
    new PugPlugin({
      // verbose: !isProd, // output information about the process to console
      // pretty: !isProd, // formatting of HTML
      pretty: true, // formatting of HTML
      css: {
        // output filename of styles
        filename: 'css/[name].[contenthash:5].css',
      },
    }),
  ],
  module: {
    rules: [
      // pug
      {
        test: /\.pug$/,
        loader: PugPlugin.loader,
      },
      // styles
      {
        test: /\.(css|sass|scss)$/,
        use: ['css-loader', 'postcss-loader', 'sass-loader'],
      },
      // fonts
      {
        test: /\.(woff2?|ttf|otf|eot|svg)$/,
        type: 'asset/resource',
        include: /assets[\\/]fonts/, // fonts from `assets/fonts` directory only, match posix and win paths
        generator: {
          // output filename of fonts
          filename: 'fonts/[name][ext][query]',
        },
      },
      // images
      {
        test: /\.(png|svg|jpe?g|webp)$/i,
        resourceQuery: { not: [/inline/] }, // ignore images with `?inline` query
        type: 'asset/resource',
        include: /assets[\\/]images/, // images from `assets/images` directory only, match posix and win paths
        generator: {
          // output filename of images
          // filename: 'images/[name].[hash:5][ext]',
          filename: (pathData) => {
            const { dir } = path.parse(pathData.filename); // the filename is relative path by project
            const outputPath = dir.replace(sourceDirname, '');
            return outputPath + '/[name][ext]';
          },
        },
      },
      // inline images: png or svg icons with size < 4 KB
      {
        test: /\.(png|svg)$/i,
        type: 'asset',
        include: /assets[\\/]images/,
        exclude: /favicon/, // don't inline favicon
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
      // force inline svg file containing `?inline` query
      {
        test: /\.(svg)$/i,
        resourceQuery: /inline/,
        type: 'asset/inline',
      },
    ],
  },
};
