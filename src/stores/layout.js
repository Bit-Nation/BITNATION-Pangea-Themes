var Immutable = require('immutable');
var controller = require('../controller');
var initializeMessage = require('../messages/initialize');
var navigateMessage = require('../messages/navigate');

controller.registerStore('layout',
  function (cursor, message, waitFor) {
    if (message.type === initializeMessage)
      return cursor.merge({
        panelSize: 56,
        coverHeight: 330
      });

    if (message.type === navigateMessage.success) {
      waitFor('routing');
      var routing = controller.getStoreData('routing');
      return cursor.set('cover', routing.get('route') !== null);
    }
  }
);