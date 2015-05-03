var controller = require('../controller');
var navigateMessage = require('../messages/navigate');

controller.registerStore('routing',
  function (cursor, message, waitFor) {
    if (message.type === navigateMessage.success)
      return updateRoute(cursor, message.data);
  }
);

function updateRoute (cursor, data) {
  return cursor.update(function (current) {
    return current
      .set('route', data.route)
      .set('params', data.params);
  });
}