var _ = require('lodash');
var Dispatcher = require('flux').Dispatcher;

var dispatcher = module.exports = new Dispatcher();

// dev
window.dispatcher = dispatcher;

// context will always be dispatcher for these methods
_.bindAll(dispatcher,
  ['register', 'unregister', 'waitFor', 'dispatch', 'isDispatching']);