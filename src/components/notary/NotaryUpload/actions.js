var Immutable = require('immutable');
var settingsActions = require('../../notary/NotaryUploadSettings/actions');

var actions = module.exports = {};

actions.getInitialState = function () {
  return Immutable.Map()
    .set('settings', settingsActions.getInitialState());
};

actions.saveState = function (cursor) {
  return {
    settings: settingsActions.saveState(cursor.cursor('settings'))
  };
};

actions.loadState = function (cursor, data) {
  return cursor.update(_.partial(settingsActions.loadState, _, data.settings));
};