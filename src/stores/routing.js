var Immutable = require('immutable');
var stores = require('../stores');
var initializeMessage = require('../messages/initialize');
var navigateMessage = require('../messages/navigate');

module.exports = stores.create('routing',
  function (cursor, message, waitFor) {
    if (message.type === initializeMessage)
      return initialize(cursor);

    if (message.type === navigateMessage.success)
      return updateRoute(cursor, message.data);
  }
);

function initialize (cursor) {
  return cursor.update(function () {
    return Immutable.fromJS({
      route: null,
      params: {}
    });
  });
}

function updateRoute (cursor, data) {
  return cursor.update(function (current) {
    return current
      .set('route', data.route)
      .set('params', data.params);
  });
}
