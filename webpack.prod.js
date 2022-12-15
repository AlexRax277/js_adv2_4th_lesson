const { merge } = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              'imagemin-pngquant',
            ],
          },
        },
      }),
      '...',
    ],
  },
});
