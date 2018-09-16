const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));

const paths = require('../paths');

const babelConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../', '.babelrc'), 'utf8'));

let envConfigs = {};
if (fs.existsSync(paths.resolveApp('.env'))) {
  envConfigs = require('dotenv').config({ // eslint-disable-line global-require
    path: paths.resolveApp('.env'),
  }).parsed;
}

const entryFile = argv.entry ? path.join(process.cwd(), argv.entry) : path.join(process.cwd(), 'src/index.js');

const customVars = Object.keys(process.env).filter(name => name.startsWith('JIBIT_APP'));

customVars.map(customVar => envConfigs[customVar] = process.env[customVar]);

module.exports = (env) => {
  const isDev = env !== 'production';
  return {
    entry: [
      'babel-polyfill',
      entryFile,
    ],
    target: 'web',
    optimization: {
      minimize: true,
      namedModules: false,
    },
    resolve: {
      modules: ['node_modules', 'src'],
      extensions: ['.js', '.jsx', '.react.js'],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: babelConfig,
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: isDev ? 'style-loader' : ExtractCssChunks.loader,
              options: isDev ? {} : {
                publicPath: '../../',
              },
            },
            'css-loader',
          ],
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            {
              loader: isDev ? 'style-loader' : ExtractCssChunks.loader,
              options: isDev ? {} : {
                publicPath: '../../',
              },
            },
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(eot|otf|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'assets/fonts',
              },
            },
          ],
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10 * 1024, // smaller than 10kb
                outputPath: 'assets/images',
              },
            },
          ],
        },
        {
          test: /\.(mp4|webm)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              outputPath: 'assets/videos',
            },
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
          ...envConfigs,
        },
      }),
      new ExtractCssChunks({
        filename: 'assets/css/[contenthash].css',
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
        inject: true,
      }),
    ],
  };
};
