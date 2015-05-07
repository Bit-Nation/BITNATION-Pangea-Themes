var _ = require('lodash');
var Immutable = require('immutable');
var Store = require('./Store');

module.exports = Store.extend({
  getInitialState: function () {
    return Immutable.fromJS({
      current: {
        keys: null,
        params: {}
      },
      routes: {}
    });
  },
  setCurrent: function (data, keys, params) {
    return data.mergeIn(['current'], {
      keys: keys,
      params: params
    });
  },
  getOptions: function (data, keys) {
    // this travels down the route tree collecting options
    return keys.reduce(function (options, key, index) {
      // when no children, the named level is used
      if (key === '$' && !options.get('routes')) return options;

      var child = options.getIn(['routes', key]);
      if (!child) throw new Error('Route not found');

      return options.delete('routes').merge(child);
    }, Immutable.Map({ routes: data.get('routes') }));
  },
  getCurrentOptions: function (data) {
    var keys = data.getIn(['current', 'keys']);
    return keys ? this.getOptions(data, keys) : null;
  },
  getPaths: function (data) {
    return flattenRoute(Immutable.Map({ routes: data.get('routes') }));
  }
});

function flattenRoute (route, keys) {
  var pathKeys = keys && (_.last(keys) == '$' ? keys.slice(0, -1) : keys);
  var path = pathKeys && pathKeys.join('/');

  var options = route.delete('routes');
  var result = Immutable.Map();
  var children = route.get('routes');
  if (!children) {
    if (!keys) return result;
    var keyResult = Immutable.fromJS(keys);
    // $ is appended to signify accessible
    if (_.last(keys) != '$') keyResult = keyResult.push('$');
    return result.set(path, options.set('keys', keyResult));
  }

  children.forEach(function (childOptions, key) {
    var childKeys = keys ? keys.concat([key]) : [ key ];
    result = result.mergeDeep(
      flattenRoute(options.mergeDeep(childOptions), childKeys));
  });

  return result;
}