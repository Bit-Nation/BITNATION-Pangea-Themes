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
var Immutable = require('immutable');

module.exports = function wrapProps (options, Child) {
  if (!Array.isArray(options)) options = [ options ];
  var map = _.partial(mapProps, options);
  if (!Child) return map;

  return React.createClass({
    mixins: [ immutableRenderMixin ],
    componentWillMount: function () {
      this.mapResults = map(this.props);
      this.mappedProps = _.last(this.mapResults);
    },
    componentWillReceiveProps: function (nextProps) {
      this.mapResults = map(nextProps, this.mapResults);
      this.mappedProps = _.last(this.mapResults);
    },
    render: function () {
      return <Child {...this.mappedProps} />;
    }
  });
};

function mapProps (maps, props, oldResults) {
  return maps.reduce(function (results, map, index) {
    var result = _.clone(_.last(results));

    if (typeof map == 'function') {
      if (!oldResults) result = map(result);
      else result = map(result, oldResults[index], oldResults[index+1]);
      result = _.clone(result);
    }
    else {
      for (var key in map) {
        var value = props[key];
        if (value === undefined) continue;

        var propMap = map[key];
        if (typeof propMap == 'function') {
          if (!oldResults) result[key] = propMap(value);
          else {
            var oldValue = oldResults[index][key];
            var oldResult = oldResults[index + 1][key];
            if (Immutable.is(value, oldValue)) result[key] = oldResult;
            else result[key] = propMap(value, oldValue);
          }
        }
        else {
          delete props[key];
          if (typeof propMap == 'string') {
            result[propMap] = value;
          }
          else if (Array.isArray(propMap)) {
            for (var i in propMap) result[propMap[i]] = value;
          }
        }
      }
    }
      
    return results.concat([ result ]);
  }, [ props ]);
}