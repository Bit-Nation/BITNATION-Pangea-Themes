var _ = require('lodash');
var page = require('page');
var controller = require('../controller');
var initializeMessage = require('../messages/initialize');
var navigateMessage = require('../messages/navigate');

var notFound = '/not-found';
var paths = ['/', notFound, '/notary', '/mail', '/mail/:id'];
var routes = paths.map(toRoute);

var options = {
  click: false,
  popstate: true,
  hashbang: true,
  dispatch: true
};

controller.registerClient(function (message) {
  console.log('router handler', message);

  if (message.type === initializeMessage)
    return initialize();
  
  if (message.type === navigateMessage)
    return page(message.data);
});

function initialize () {
  // add route handlers through page
  paths.forEach(function (path, i) {
    page(path, function (context) {
      // this stuff
      context.handled = true;
      context.save();

      controller.dispatch(navigateMessage.success({
        route: routes[i],
        params: _.clone(context.params)
      }));
    });
  });

  page('*', function (context) {
    // and this is a weird trick to get /#!/ instead of /#!
    // discovered it by accident lol
    // will have to revisit routing later
    if (context.handled) return;

    controller.dispatch(navigateMessage.fail());
    page.redirect(notFound);
  });

  page(options);
}

function toRoute (path) {
  var route = path.split('/').filter(function (part) {
    return part != '';
  }).map(_.camelCase);

  return route.length == 0 ? null : route;
}