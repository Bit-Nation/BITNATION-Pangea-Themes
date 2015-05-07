var controller = require('../controller');
var signInMessage = require('../messages/signIn');
var signOutMessage = require('../messages/signOut');

controller.on('message', function (message) {
  if (message.type === signInMessage)
    return controller.dispatch(signInMessage.success());

  if (message.type === signOutMessage)
    return controller.dispatch(signOutMessage.success());
});