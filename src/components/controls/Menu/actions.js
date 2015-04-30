var _ = require('lodash');
var Immutable = require('immutable');

var actions = module.exports = {};

actions.getInitialState = function () {
  return Immutable.Map({
    selected: null
  });
};

actions.saveState = function (cursor) {
  return cursor.toJS();
};

actions.loadState = function (cursor, data) {
  return cursor.update(function () { return Immutable.fromJS(data) });
};

actions.select = function (cursor, keys) {
  if (keys == null)
    return cursor.set('selected', null);

  var current = cursor.get('selected');
  var value = keys;

  // select the parent if the keys are
  // equal or directly descending to the currently selected item
  // -- this closes stuff
  if (current && current.length >= keys.length &&
    _.isEqual(keys, current.slice(0, keys.length)))
    value = value.length > 1 ? value.slice(0, -1) : null;

  return cursor.set('selected', value);
};

actions.deselect = function (cursor) {
  return cursor.set('selected', null);
};