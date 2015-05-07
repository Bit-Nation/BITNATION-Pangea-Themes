var controller = require('../../controller');
var signInMessage = require('../../messages/signIn');
var signOutMessage = require('../../messages/signOut');

controller.addStore('currentUser', function (data, message, waitFor) {
  if (message.type === signInMessage.success)
    return data.set('signedIn', true);

  if (message.type === signOutMessage.success)
    return data.set('signedIn', false);
});