var _ = require('lodash');
var util = require('util');
var EventEmitter = require('events');
var Dispatcher = require('flux').Dispatcher;
var Immutable = require('immutable');
var immstruct = require('immstruct');
var Store = require('./Store');

var Controller = module.exports = function Controller () {
  initialize(this);
};

util.inherits(Controller, EventEmitter);

// make stuff private
function initialize (controller) {
  var data = immstruct({
    scenes: {},
    stores: {}
  });

  // ---- DANGEROUS DEV STUFF -----
  Object.defineProperty(window, 'cursor', {
    get: function () { return data.cursor() }
  });

  data.on('next-animation-frame',
    _.bind(controller.emit, controller, 'render'));

  data.on('swap',
    _.bind(controller.emit, controller, 'swap'));

  var scenes = {};
  var stores = {};
  var storeCache = {};

  var dispatcher = new Dispatcher();
  var dispatchTokens = {};
  var dispatchData;

  controller.isDispatching = function () {
    return dispatcher.isDispatching()
  };

  controller.dispatch = function (message) {
    dispatchData = data.current.get('stores');
    dispatcher.dispatch(message);
    var resultData = dispatchData;
    dispatchData = null;

    if (!Immutable.is(resultData, data.current.get('stores')))
      data.cursor('stores').update(function () { return resultData; });

    controller.emit('message', message);
  };

  controller.getStoreData = function (name) {
    return data.current.getIn(name ? ['stores', name] : ['stores']);
  };

  controller.getStores = function () {
    var result = {};
    for (var name in stores) result[name] = controller.getStore(name);
    return result;
  };

  controller.getStore = function (name) {
    var store = stores[name](controller.getStoreData(name));
    if (storeCache[name] &&
        Immutable.is(storeCache[name].data, store.data))
      return storeCache[name];
    storeCache[name] = store;
    return store;
  };

  controller.addStore = function (name, Type, handler) {
    if (!handler) {
      handler = Type;
      Type = Store;
    }

    data.cursor('stores').update(name, Type.getInitialState);

    stores[name] = Type;
    dispatchTokens[name] = dispatcher.register(function (message) {
      var waitFor = createWaitFor(
        dispatcher, dispatchTokens, stores, dispatchData);
      var result = handler(dispatchData.get(name), message, waitFor);
      
      if (result !== undefined)
        dispatchData = dispatchData.set(name, result);
    });
    
    controller.emit('addStore', name);
  };

  controller.removeStore = function (name) {
    dispatcher.unregister(dispatchTokens[name]);
    data.cursor('stores').delete(name);
    delete stores[name];
    controller.emit('removeStore', name);
  };

  controller.getScenes = function (name) {
    return data.cursor(['scenes']);
  };

  controller.getScene = function (name) {
    return data.cursor(['scenes', name]);
  };

  controller.addScene = function (name) {
    data.cursor('scenes').set(name, Immutable.Map());
    scenes[name] = true;
    controller.emit('addScene', name);
  };

  controller.removeScene = function (name) {
    data.cursor('scenes').delete(name);
    delete scenes[name];
    controller.emit('removeScene', name);
  };
};

function createWaitFor (dispatcher, tokens, types, data) {
  return function waitFor (dependencies, done) {
    if (!Array.isArray(dependencies)) dependencies = [ dependencies ];

    dispatcher.waitFor(dependencies.map(function (name) {
      return tokens[name];
    }));

    if (!done) return;
    var stores = dependencies.map(function (name) {
      return types[name](data.get(name));
    });
    return done.apply(null, stores);
  };
};