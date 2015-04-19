var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var bourbon = require('node-bourbon');

var includePaths = {
  css: [],
  scss: [
    bourbon.includePaths
  ]
};

module.exports = {
  context: path.join(process.cwd(), 'src'),
  entry: './entry.js',
  output: {
    path: path.join(process.cwd(), 'build'),
    publicPath: '/assets/',
    filename: '[name].js',
    chunkFilename: '[name]-[id].js'
  },
  plugins: [
    new ExtractTextPlugin('[name].css', { allChunks: true })
  ],
  modulesDirectories: [
    'node_modules',
    'bower_components'
  ],
  module: {
    resolve: {
      extensions: ['', '.js', '.json', '.css', '.scss']
    },
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader',
          'css-loader?includePaths[]=' + includePaths.css)
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader',
          'css-loader!sass-loader?includePaths[]=' + includePaths.scss)
      },
      {
        test: /\.js$/,
        loader: 'jsx'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  recordsPath: path.join(process.cwd(), 'cache', 'webpack.json')
};