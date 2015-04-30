var _ = require('lodash');
var dispatcher = require('./dispatcher');

var clients = module.exports = {};

clients.create = function (handler) {
  return {
    dispatchToken: dispatcher.register(
      _.partial(dispatchHandler, handler))
  };
};

function dispatchHandler (handler, action) {
  var done = false;
  var dispatch = function (message) {
    if (done) dispatcher.dispatch(message);
    else _.defer(_.partial(dispatcher.dispatch, message));
  };

  handler(
    action,
    dispatcher.waitFor,
    dispatch
  );

  done = true;
}