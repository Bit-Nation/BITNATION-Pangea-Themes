/** @jsx React.DOM */

/*

  wrapProps for React components
  
  wraps props before passing them down to the Child component
  options can be a set of propName : handler, a function or
  an array containing sets and functions, which will be
  processed in order.

  if a set is passed is passed each prop is mapped through its
  respective handler, the handler can either be a function,
  string or array of strings. the function will be passed the
  prop value and should return a value, or undefined. strings
  will be used for new prop keys and the existing one deleted.

  if a function is passed it will be given all props and it
  should return a new set of props.
  
  example use
  wrapProps([
    {
      score: ['score', 'totalScore']
    },
    {
      totalScore: function (score) { return score / 100; },
      messages: MessageStore
    }
  ], MessageComponent)
*/

var React = require('react');
var immutableRenderMixin = require('react-immutable-render-mixin');

module.exports = function wrapProps (options, Child) {
  if (!Array.isArray(options)) options = [ options ];
  var map = _.partial(mapProps, options);
  if (!Child) return map;

  return React.createClass({
    mixins: [ immutableRenderMixin ],
    render: function () {
      return <Child {...this.props} {...map(this.props)} />;
    }
  });
};

function mapProps (maps, props) {
  return maps.reduce(function (props, map) {
    if (typeof map == 'function')
      return _.clone(map(_.clone(props)));

    var result = {};
    for (var key in map) {
      var current = props[key];
      if (current === undefined) continue;
      var propMap = map[key];
      if (typeof propMap == 'function') result[key] = propMap(current);
      else {
        delete props[key];
        if (typeof propMap == 'string') {
          result[propMap] = current;
        }
        else if (Array.isArray(propMap)) {
          for (var i in propMap) result[propMap[i]] = current;
        }
      }
    }
    
    return result;
  }, props);
}