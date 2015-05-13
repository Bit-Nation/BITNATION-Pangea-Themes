var controller = require('../../controller');
var initializeMessage = require('../../messages/initialize');
var navigateMessage = require('../../messages/navigate');
var RoutingStore = require('../../lib/RoutingStore');
var routes = require('./routes');

var defaults = {
  routes: routes
};

controller.addStore('routing', RoutingStore, function (data, message, waitFor) {
  if (message.type === initializeMessage)
    return data.mergeDeep(defaults);

  if (message.type === navigateMessage.success)
    return setCurrent(data, message.data.keys, message.data.params);

  if (message.type === navigateMessage.fail)
    return setNotFound(data);
});

function setCurrent (data, keys, params) {
  return RoutingStore.setCurrent(
    data, Immutable.fromJS(keys), Immutable.fromJS(params));
}

function setNotFound (data) {
  return RoutingStore.setCurrent(
    data, Immutable.fromJS(['notFound', '$']), Immutable.fromJS({}));
}