var Immutable = require('immutable');
var controller = require('../controller');
var scrollMessage = require('../messages/scroll');

controller.addStore('window', function (data, message, waitFor) {
  if (message.type === scrollMessage.success)
    return updateScroll(data, message.data.left, message.data.top);
});

function updateScroll (data, left, top) {
  return data.merge({ scrollLeft: left, scrollTop: top });
}