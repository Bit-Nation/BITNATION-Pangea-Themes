var message = require('../../lib/message');

var notaryVerifyTx = module.exports = message('notaryVerifyTx');

notaryVerifyTx.success = message(notaryVerifyTx, 'success');
notaryVerifyTx.fail = message(notaryVerifyTx, 'fail');
notaryVerifyTx.cancel = message(notaryVerifyTx, 'cancel');