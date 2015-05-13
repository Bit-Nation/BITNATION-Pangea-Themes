var controller = require('../controller');
var initializeMessage = require('../messages/initialize');
var setMessage = require('../messages/setLayoutSizes');

var defaults = {
  panel: 220,
  panelMinimized: 56,
  coverHeight: 330
};

controller.addStore('layoutSizes', function (data, message, waitFor) {
  if (message.type === initializeMessage)
    return data.merge(defaults);

  if (message.type === setMessage)
    return data.merge(message.data);   
});