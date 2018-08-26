const merge = require('webpack-merge');
const fs = require('fs');
const config = require('./webpack.base.babel')('production');
const paths = require('../paths');

let customConfigs = {};

if (fs.existsSync(paths.resolveApp('webpack.config.js'))) {
  customConfigs = require(paths.resolveApp('webpack.config.js'));
}

module.exports = merge(
  config,
  {
    mode: 'production',
    output: {
      filename: 'assets/js/[contenthash].bundle.js',
      publicPath: '',
    },
    optimization: {
      minimize: true,
      namedModules: false,
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            name: 'vendor',
            chunks: 'initial',
            enforce: true,
          },
        },
      },
    },
  },
  customConfigs,
);
