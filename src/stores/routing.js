var Immutable = require('immutable');
var navigateMessage = require('../messages/navigate');
var controller = require('../controller');

controller.registerStore('routing',
  function (cursor, message, waitFor) {
    if (message.type === navigateMessage.success)
      return updateRoute(cursor, message.data);
  }
);

function updateRoute (cursor, data) {
  return cursor.update(function (current) {
    return (current || Immutable.Map())
      .set('route', data.route)
      .set('params', data.params);
  });
};