var _ = require('lodash');
var immstruct = require('immstruct');
var Immutable = window.Immutable = require('immutable');

var appActions = window.appActions = require('./components/scenes/App/actions');
var siteNavigationActions = require('./components/navigation/SiteNavigation/actions');

var data = module.exports = immstruct({
  stores: {}
});

data.cursor()
  .set('scene', appActions.getInitialState())
  .updateIn(['scene', 'siteNavigation'],
    _.partial(siteNavigationActions.select, _, [3, 1]));

// testing
window.data = data;