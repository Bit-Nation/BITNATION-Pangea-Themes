var message = require('../../lib/message');

var notaryUpload = module.exports = message('notaryUpload');

notaryUpload.success = message(notaryUpload, 'success');
notaryUpload.fail = message(notaryUpload, 'fail');
notaryUpload.cancel = message(notaryUpload, 'cancel');