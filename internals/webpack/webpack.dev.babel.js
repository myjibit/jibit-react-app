const webpack = require('webpack');
const merge = require('webpack-merge');

const config = require('./webpack.base.babel')('dev');

module.exports = merge(
  config,
  {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: [
      'webpack-hot-middleware/client',
    ],
    output: {
      publicPath: '',
    },
    devServer: {
      open: true,
      overlay: true,
      progress: true,
    },
    optimization: {
      minimize: false,
      namedModules: true,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
  },
);
