var _ = require('lodash');
var Immutable = require('immutable');
var ComponentStore = require('../../lib/ComponentStore');

var SiteNavigationStore = require('../../navigation/SiteNavigation/Store');
var UserNavigationStore = require('../../navigation/UserNavigation/Store');
var notaryPageActions = require('../../pages/NotaryPage/actions');

module.exports = ComponentStore.extend({
  getInitialState: function () {
    return Immutable.Map({
      minimized: true,
      notaryPage: notaryPageActions.getInitialState(),
      siteNavigation: SiteNavigationStore.getInitialState(),
      //userNavigation: UserNavigationStore.getInitialState()
    });
  },
  toggle: function (data, minimized) {
    if (minimized == null) minimized = !data.get('minimized');
    else if (minimized == data.get('minimized')) return data;

    var result = data.set('minimized', minimized);
    if (minimized) return result;
    return result.update('siteNavigation', SiteNavigationStore.deselect);
  }
});