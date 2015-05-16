var controller = require('../../controller');
var signInMessage = require('../../messages/signIn');
var signOutMessage = require('../../messages/signOut');
var userStateUpdatedMessage = require('../../messages/userStateUpdated');

var Bitnation = require('../../bitnation/bitnation.core');
require('../../bitnation/bitnation.pangea');

controller.addStore('currentUser', function (data, message, waitFor) {
  switch (message.type) {
    case userStateUpdatedMessage:
      return data.merge({
        hzAccount: message.data,
        signedIn: !!message.data
      });
  }
});