var controller = require('../controller');
var signInMessage = require('../messages/signIn');
var signOutMessage = require('../messages/signOut');
var initializeMessage = require('../messages/initialize');
var navigateMessage = require('../messages/navigate');
var userStateUpdatedMessage = require('../messages/userStateUpdated');

var Bitnation = require('../bitnation/bitnation.core');
require('../bitnation/bitnation.pangea');

var ui = new Bitnation.pangea.UI();

/**
 * Sign a user in with their secret phrase
 */
var _signUserIn = function (secret) {

  if (secret === undefined || (typeof secret != 'string' && !secret instanceof String)) {
    alert('You must supply a passphrase.');
    return controller.dispatch(signInMessage.fail());
  } else if (secret !== undefined && secret.length == 0) {
    alert('You must supply a passphrase.');
    return controller.dispatch(signInMessage.fail());
  } else if (secret.length < 32) {
    alert('This passphrase is insecure. Please use one that is 32 characters or longer.');
    return controller.dispatch(signInMessage.fail());
  }

  ui.login(secret)
  .done(function (account) {

    controller.dispatch(
      signInMessage.success(ui.getCurrentUser())
    );

  })
  .fail(function (err) {

    console.error(err || 'No error message available.');

    if (err.errorDescription !== undefined) {
      alert(err.errorDescription);
    } else {
      alert(err || 'Unable to log in. Check the console.');
    }

    return controller.dispatch(signInMessage.fail());

  });

};

/**
 * Sign a user into the UI who is already logged into the client
 */
var _updateUserState = function (account) {
  return controller.dispatch(userStateUpdatedMessage(account));
};

/**
 * Sign out any currently logged in user
 */
var _signUserOut = function () {
  ui.logout();
  controller.dispatch(userStateUpdatedMessage(null));
  controller.dispatch(signOutMessage.success());
};

controller.on('message', function (message) {
  switch (message.type) {
    case initializeMessage:
      if (ui.isLoggedIn()) {
        return _updateUserState(ui.getCurrentUser());
      }
      break;
    case signInMessage:
      return _signUserIn(message.data.secret);
    case signInMessage.success:
      _updateUserState(ui.getCurrentUser());
      return controller.dispatch(navigateMessage('/'));
    case signInMessage.fail:
      return _signUserOut();
    case signOutMessage:
      return _signUserOut();
    case signOutMessage.success:
      return controller.dispatch(navigateMessage('/sign-in'));
  }
});