var Immutable = require('immutable');
var MenuStore = require('../../controls/Menu/Store');
var items = require('./items');

module.exports = MenuStore.extend({
  getInitialState: function () {
    return MenuStore.getInitialState()
      .set('items', Immutable.fromJS(items));
  }
});