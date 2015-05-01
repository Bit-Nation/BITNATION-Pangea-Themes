var message = require('../lib/message');

var navigate = module.exports = message('navigate');

navigate.success = message(navigate, 'success',
  function (route, params) {
    return {
      route: route,
      params: params
    };
  }
);
navigate.fail = message(navigate, 'fail');
navigate.cancel = message(navigate, 'cancel');