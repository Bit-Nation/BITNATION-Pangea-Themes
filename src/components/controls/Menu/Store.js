var _ = require('lodash');
var Immutable = require('immutable');
var ComponentStore = require('../../lib/ComponentStore');

module.exports = ComponentStore.extend({
  getInitialState: function () {
    return Immutable.Map({
      selected: null
    });
  },
  getLoadedState: function (data, saveData) {
    return data.set('selected', saveData.selected);
  },
  setItems: function (data, items) {
    var result = data.set('items', items);
    var selected = data.get('selected');
    if (selected == null) return result;

    var item;
    while (
      !(item = this.findItem(result, selected)) &&
      selected.length > 0
    ) selected.splice(-1);

    return data
      .set('selected', selected.length > 0 ? selected : null);
  },
  get: function (data, keys) {
    return keys.reduce(function (items, key, keyIndex) {
      var item = items.find(function (item, itemIndex) {
        if (item.get('key') == null) return itemIndex === key;
        else return item.get('key') === key;
      });

      return keyIndex == keys.length - 1 ? item : item.get('items');
    }, data.get('items'));
  },
  select: function (data, keys) {
    if (keys == null)
      return data.set('selected', null);

    var current = data.get('selected');
    var value = keys;

    // select the parent if the keys are
    // equal or directly descending to the currently selected item
    // -- this closes stuff
    if (current && current.length >= keys.length &&
      _.isEqual(keys, current.slice(0, keys.length)))
      value = value.length > 1 ? value.slice(0, -1) : null;

    return data.set('selected', value);
  },
  deselect: function (cursor) {
    return cursor.set('selected', null);
  }
});