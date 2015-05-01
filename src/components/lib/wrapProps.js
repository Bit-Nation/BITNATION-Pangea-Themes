/** @jsx React.DOM */

/*

  wrapProps for React components

  takes a set of propName : handler and wraps a component
  props that are not in the set are just passed down to
  the child, props that are will first be mapped through
  the respective handler.

  if an object is passed instead of a fn, it will be
  assumed to be the prototype of a class and its
  constructor will be called in its place
  ie., new object.constructor(prop)
  insetad of, object(prop)
  
  example use
  wrapProps({
    score: function (prop) { return prop * 100; },
    messages: MessageStore.prototype
  }, MessageComponent)

  child.props.messages will be
  new MessageStore(parent.props.messages)
*/

var React = require('react');
var immutableRenderMixin = require('react-immutable-render-mixin');

module.exports = function wrapProps (options, Child) {
  var handlers = {};
  for (var key in options) {
    // create constructor wrappers for any prototypes passed
    if (typeof options[key] == 'object') {
      var proto = options[key];
      handlers[key] = function (prop) {
        return new proto.constructor(prop); };
    }
    else handlers[key] = options[key];
  }

  var Parent = React.createClass({
    mixins: [ immutableRenderMixin ],
    render: function () {
      var wrapped = {};
      for (var key in handlers) {
        if (this.props[key] !== undefined)
          wrapped[key] = handlers[key](this.props[key]);
      }

      return <Child {...this.props} {...wrapped} />;
    }
  });

  return Parent;
};