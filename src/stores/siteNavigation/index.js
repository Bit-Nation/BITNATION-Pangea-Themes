var _ = require('lodash');
var controller = require('../../controller');
var initializeMessage = require('../../messages/initialize');
var clickMessage = require('../../messages/siteNavigation/click');
var minimizeMessage = require('../../messages/siteNavigation/minimize');

var SiteNavigationStore = require('../../lib/SiteNavigationStore');
var items = require('./items');

var defaults = {
  minimized: false,
  items: items
};

controller.addStore('siteNavigation', SiteNavigationStore,
function (data, message, waitFor) {
  if (message.type === initializeMessage)
    return data.mergeDeep(defaults);

  if (message.type === minimizeMessage) 
    return SiteNavigationStore.minimize(data, message.data);

  if (message.type === clickMessage)
    return SiteNavigationStore.select(data, message.data);
});