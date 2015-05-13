var Store = require('./Store');

module.exports = Store.extend({
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
  getItem: function (data, keys) {
    return keys.reduce(function (items, key, keyIndex) {
      var item = items.find(function (item, itemIndex) {
        if (item.get('key') == null) return itemIndex === key;
        else return item.get('key') === key;
      });

      return keyIndex == keys.length - 1 ? item : item.get('items');
    }, data.get('items'));
  }
});