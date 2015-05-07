var _ = require('lodash');
var page = require('page');
var controller = require('../controller');
var initializeMessage = require('../messages/initialize');
var navigateMessage = require('../messages/navigate');
var signInMessage = require('../messages/signIn');
var signOutMessage = require('../messages/signOut');

var options = {
  click: false,
  popstate: true,
  hashbang: true,
  dispatch: true
};

controller.on('message', function (message) {
  if (message.type === initializeMessage)
    return initialize();
  
  if (message.type === navigateMessage)
    return page(message.data);

  if (message.type === signInMessage.success)
    return page('/');

  if (message.type === signOutMessage.success)
    return page('/sign-in');
});

function initialize () {
  var routing = controller.getStore('routing');
  var paths = routing.getPaths();

  // add route handlers through page
  paths.forEach(function (options, path) {
    if (options.get('hidden')) return;
    var keys = options.get('keys').toJS();
    var pagePath = '/' + path.replace(/\$/g, ':');
    var handler = function (context) {
      if (!options.get('public')) {
        var user = controller.getStore('currentUser');
        if (!user.data.get('signedIn'))
          return page.redirect('/sign-in');
      }

      controller.dispatch(navigateMessage.success({
        keys: keys,
        params: _.clone(context.params)
      }));
    };
    // such a hack, wont play nice
    page(pagePath, handler);
    page('/' + pagePath, handler);
  });

  page('*', function (context) {
    controller.dispatch(navigateMessage.fail('notFound'));
  });

  page(options);
}