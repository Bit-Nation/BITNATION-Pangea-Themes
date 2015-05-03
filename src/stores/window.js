var Immutable = require('immutable');
var controller = require('../controller');
var scrollMessage = require('../messages/scroll');

controller.registerStore('window',
  function (cursor, message, waitFor) {
    if (message.type === scrollMessage.success)
      return updateScroll(cursor, message.data);
  }
);

function updateScroll (cursor, data) {
  return cursor.update(function (current) {
    return current
      .set('scrollLeft', data.left)
      .set('scrollTop', data.top);
  });
}