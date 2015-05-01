var _ = require('lodash');
var Immutable = require('immutable');
var immstruct = require('immstruct');
var OnDispatcher = require('./lib/OnDispatcher');
var Store = require('./lib/Store');

var controller = module.exports = {};
window.ctrl = controller; // dev

var data = controller.data = immstruct();

var dispatcher = controller.dispatcher = new OnDispatcher();
controller.dispatch = controller.dispatcher.dispatch;

var stores = {};
var sceneActions;

controller.registerStore = function (name, handler, Type) {
  if (stores[name])
    throw new Error('Duplicate store name \'' + name + '\'');

  if (!Type) Type = Store;
  stores[name] = {
    Type: Type,
    handler: handler,
    dispatchToken: dispatcher.register(
      _.partial(dispatchHandler, name, handler))
  };
};

controller.registerClient = function (handler) {
  dispatcher.on(_.partial(handler, _, dispatcher.dispatch));
};

controller.registerScene = function (actions) {
  sceneActions = actions;
};

controller.getStore = function (name) {
  return new stores[name].Type(this.getStoreData());
};

controller.getStoreData = function (name) {
  return data.cursor(name ? ['stores', name] : 'stores').deref();
};

controller.getSceneCursor = function () {
  return data.cursor('scene');
};

controller.getSaveData = function () {
  var data = {
    stores: {},
    scene: null
  };

  for (var name in stores) {
    if (stores[name].Type.getSaveData)
      data.stores[name] = stores[name].Type.getSaveData();
  }

  if (sceneActions &&
      sceneActions.getSaveData &&
      data.cursor('scene').deref()) {
    data.scene = sceneActions.getSaveData(data.cursor('scene'));
  }

  return data;
};

controller.start = function (saveData) {
  data.cursor().update(function (current) {
    return current
      .set('stores', loadStores(saveData && saveData.stores))
      .set('scene', loadScene(saveData && saveData.scene));
  });
};

function loadStores (saveData) {
  var states = {};
  for (var name in stores) {
    states[name] = stores[name].Type.getInitialState();
  }

  var value = Immutable.Map(states);
  if (!saveData) return value;

  for (var name in stores) {
    var Type = stores[name].Type;
    if (!Type.getLoadedState ||
        saveData[name] == null) continue;

    value = value.update(name,
      _.bind(Type.getLoadedState, Type, _, saveData[name]));
  }

  return value;
}

function loadScene (saveData) {
  if (!sceneActions) return;

  var value;

  if (sceneActions.getInitialState)
    value = sceneActions.getInitialState();

  if (sceneActions.getSaveData && saveData)
    value = sceneActions.getLoadedState(value, saveData);

  return value;
}

function dispatchHandler (name, handler, message) {
  handler(
    data.cursor(['stores', name]),
    message,
    waitFor
  );
}

function waitFor (storeNames) {
  dispatcher.waitFor(storeNames.map(function (name) {
    return stores[name].dispatchToken;
  }));
}