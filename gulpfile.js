var fs = require('fs-extra');
var path = require('path');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var webpackConfig = {
  default: require('./config/webpack/default'),
  build: require('./config/webpack/build'),
  server: require('./config/webpack/server')
};

var debug = require('debug')('bitnation');

gulp.task('default', function (done) {
  runSequence('clean', 'server', done);
});

gulp.task('clean', function (done) {
  fs.removeSync('./build');
  fs.removeSync('./cache');

  process.nextTick(function () {
    fs.mkdirSync('./build');
    fs.mkdirSync('./cache');
    done();
  });
});

// build for production
gulp.task('build', function (done) {
  debug('Compiling bundles...');
  webpack(webpackConfig.build, done);
});

// run dev server
gulp.task('server', function (done) {
  var compiler = webpack(webpackConfig.server);
  var server = new WebpackDevServer(compiler, {
    contentBase: './server',
    hot: false,
    quiet: false
  });

  server.listen(8080, function () {
    debug('Listening to 8080');
    debug('Open up in your browser: http://localhost:8080/');
  });
});