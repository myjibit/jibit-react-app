const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const express = require('express');

const webpackConfig = require('../webpack/webpack.dev.babel');

const compiler = webpack(webpackConfig);
const app = express();

app.use(middleware(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath,
}));
app.use(require('webpack-hot-middleware')(compiler));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
