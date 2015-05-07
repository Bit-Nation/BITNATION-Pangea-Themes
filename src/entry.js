// libraries
require('react/addons');
window.Immutable = require('immutable');

// stores
require('./stores/currentUser');
require('./stores/notary');
require('./stores/routing');
require('./stores/window');
require('./stores/layoutSizes');
require('./stores/siteNavigation');
require('./stores/userNavigation');

// clients
require('./clients/users');
require('./clients/notary');
require('./clients/router');
require('./clients/window');

// initialize app
require('./app');