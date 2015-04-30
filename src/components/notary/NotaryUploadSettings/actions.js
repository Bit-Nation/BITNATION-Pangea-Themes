var Immutable = require('immutable');

var actions = module.exports = {};

actions.getInitialState = function () {
  return Immutable.Map({
    public: false,
    uri: null,
    secret: null
  });
};

actions.saveState = function (cursor) {
  return {
    public: cursor.get('public'),
    uri: cursor.get('uri')
  };
};

actions.loadState = function (cursor) {
  return cursor
    .set('public', data.public)
    .set('uri', data.uri);
};