/*
  flux Dispatcher with hook after
  .on(fn) / .off(fn)
*/

var _ = require('lodash');
var util = require('util');
var Dispatcher = require('flux').Dispatcher;

var OnDispatcher = module.exports = function OnDispatcher () {
  Dispatcher.apply(this, arguments);

  // context will always be dispatcher for these methods
  _.bindAll(this, [
    'on', 'off',
    'register', 'unregister',
    'waitFor', 'dispatch',
    'isDispatching']);
};

util.inherits(OnDispatcher, Dispatcher);

OnDispatcher.prototype.dispatch = function (message) {
  Dispatcher.prototype.dispatch.call(this, message);
  for (var i in this._on) this._on[i](message);
};

OnDispatcher.prototype.on = function (handler) {
  if (!this._on) this._on = [ handler ];
  else this._on.push(handler);
};

OnDispatcher.prototype.off = function (handler) {
  if (!this._on) return false;
  var index = this._on.indexOf(handler);
  if (index == -1) return false;
  this._on.splice(index, 1);
  return true;
};