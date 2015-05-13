var message = require('../lib/message');

var navigate = module.exports = message('navigate');

navigate.success = message(navigate, 'success');
navigate.fail = message(navigate, 'fail');