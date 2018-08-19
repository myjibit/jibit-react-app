const merge = require('webpack-merge');
const config = require('./webpack.base.babel')('production');

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
);
