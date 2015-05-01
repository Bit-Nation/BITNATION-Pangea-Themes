var Store = require('./Store');

module.exports = Store.extend({
  getSaveData: function (data) {
    return data.toJS();
  },
  getLoadedState: function (data, saveData) {
    return data.merge(saveData);
  }
});