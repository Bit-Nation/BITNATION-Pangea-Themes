var _ = require('lodash');
var Immutable = require('immutable');
var siteNavigationActions = require('../../navigation/SiteNavigation/actions');
var notaryPageActions = require('../../pages/NotaryPage/actions');

var actions = module.exports = {};

actions.getInitialState = function () {
  var map = Immutable.Map();

  return map
    .set('siteNavigation', siteNavigationActions.getInitialState())
    .set('notaryPage', notaryPageActions.getInitialState());
};

actions.saveState = function (cursor) {
  return {
    siteNavigation: siteNavigationActions.saveState(
      cursor.cursor('siteNavigation')),

    notaryPage: notaryPageActions.saveState(
      cursor.cursor('notaryPage'))
  };
};

actions.loadState = function (cursor) {
  return cursor
    .update('siteNavigation',
      _.partial(siteNavigationActions.loadState, _, data.siteNavigation))
    .update('notaryPage',
      _.partial(notaryPageStore.loadState, _, data.notaryPage));
};