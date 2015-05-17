var Controller = require('./lib/Controller');

var controller = module.exports = new Controller();

// dev
/*
window.ctrl = controller;
controller.on('message', function (message) {
  console.log('message', message.typeName, message.data);
});
*/