var _ = require('lodash');
var data = require('./data');
var dispatcher = require('./dispatcher');

var stores = module.exports = {};

stores.data = function (name) {
  return data.cursor(name ? ['stores', name] : 'stores').deref();
};

stores.create = function (name, handler) {
  return {
    name: name,
    data: _.partial(stores.data, name),
    dispatchToken: dispatcher.register(
      _.partial(dispatchHandler, name, handler))
  };
};

function dispatchHandler (name, handler, action) {
  handler(
    data.cursor(['stores', name]),
    action,
    dispatcher.waitFor
  );
}