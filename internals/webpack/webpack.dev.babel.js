const webpack = require('webpack');
const fs = require('fs');
const merge = require('webpack-merge');
const paths = require('../paths');

const config = require('./webpack.base.babel')('dev');

let customConfigs = {};

if (fs.existsSync(paths.resolveApp('webpack.config.js'))) {
  customConfigs = require(paths.resolveApp('webpack.config.js'));
}

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
  customConfigs,
);
