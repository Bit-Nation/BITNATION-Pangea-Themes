var message = require('../lib/message');

var signIn = module.exports = message('signIn');

signIn.success = message(signIn, 'success');
signIn.fail = message(signIn, 'fail');