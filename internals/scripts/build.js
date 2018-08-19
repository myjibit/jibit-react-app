process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const chalk = require('chalk');
const webpackConfig = require('../webpack/webpack.prod.babel');

function build () {
  console.log('Creating an optimized production build...');
  const compiler = webpack(webpackConfig);
  compiler.run((err, stats) => {
    if (err) {
      console.log(chalk.red('Build failed!'));
    }
    console.log(chalk.green('Compiled successfully.\n'));
  });
}

build();
