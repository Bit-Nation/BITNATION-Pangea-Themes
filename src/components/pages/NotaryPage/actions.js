var Immutable = require('immutable');
var uploadActions = require('../../notary/NotaryUpload/actions');

var actions = module.exports = {};

actions.getInitialState = function () {
  var map = Immutable.Map();

  return map
    .set('upload', uploadActions.getInitialState());
};

actions.saveState = function (cursor) {
  return {
    upload: uploadActions.saveState(cursor.cursor('upload'))
  };
};

actions.loadState = function (cursor) {
  return cursor.update('upload',
      _.partial(uploadActions.loadState, _, data.upload));
};