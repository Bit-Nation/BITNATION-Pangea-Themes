// libraries
require('react/addons');
window.Immutable = require('immutable');

// stores
require('./stores/routing');
require('./stores/window');
require('./stores/layout');
require('./stores/notary');

// clients
require('./clients/router');
require('./clients/window');

// initialize app
require('./app');