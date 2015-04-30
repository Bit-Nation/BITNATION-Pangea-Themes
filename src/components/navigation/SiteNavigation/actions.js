var _ = require('lodash');
var Immutable = require('immutable');
var menuActions = require('../../controls/Menu/actions');

var actions = module.exports = {};

actions.getInitialState = function () {
  var map = Immutable.Map({
    minimized: false,
  });
  return map.set('menu', menuActions.getInitialState());
};

actions.saveState = function (cursor) {
  return {
    minimized: cursor.get('minimized'),
    menu: menuActions.saveState(cursor.cursor('menu'))
  };
};

actions.loadState = function (cursor, data) {
  return cursor
    .set('minimized', data.minimized)
    .update('menu', _.partial(menuActions.loadState, _, data.menu));
};

actions.toggle = function (cursor, minimized) {
  var value = minimized == null ? !cursor.get('minimized') : minimized;
  cursor = cursor.set('minimized', value);
  return value ? actions.deselect(cursor) : cursor;
};

actions.select = function (cursor, keys, item) {
  cursor = cursor.update('menu', _.partial(menuActions.select, _, keys));
  if (!item ||
      !item.items ||
      !cursor.getIn(['menu', 'selected'])) return cursor;
  return actions.toggle(cursor, false);
};

actions.deselect = function (cursor) {
  return cursor.update('menu', menuActions.deselect);
};