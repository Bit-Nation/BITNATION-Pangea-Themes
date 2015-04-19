var webpack = require('webpack');
var defaultConfig = require('./default');

var config = module.exports = Object.create(defaultConfig);

config.target = 'web';
config.plugins = config.plugins.concat(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: 'production'
    }
  }),
  new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 15 }),
  new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin()
);