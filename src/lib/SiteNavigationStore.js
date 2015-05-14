var MenuStore = require('./MenuStore');

module.exports = MenuStore.extend({
  minimize: function (data, value) {
    if (value == null) value = !data.get('minimized');
    var result = data.set('minimized', value);
    if (!result.get('selected')) return result;
    return result.set('selected', null);
  },
  hide: function (data, name, value) {
    if (value == null) value = !data.get('hidden');
    return data.set('hidden', value);
  },
  select: function (data, keys) {
    var result = data.set('selected', keys);
    // expand if minimized and selected item has children
    if (!result.get('minimized') ||
        !result.get('selected')) return result;
    var item = this.getItem(result, result.get('selected'));
    if (!item || !item.get('items')) return result;
    return result.set('minimized', false);
  }
});