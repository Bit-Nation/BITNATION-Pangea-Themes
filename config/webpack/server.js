var webpack = require('webpack');
var defaultConfig = require('./default');

var config = module.exports = Object.create(defaultConfig);

config.devtool = 'sourcemap';
config.debug = true;

config.plugins = config.plugins.concat(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"',
      __DEV__: true
    }
  })
);