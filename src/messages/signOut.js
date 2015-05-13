var message = require('../lib/message');

var signOut = module.exports = message('signOut');

signOut.success = message(signOut, 'success');
signOut.fail = message(signOut, 'fail');