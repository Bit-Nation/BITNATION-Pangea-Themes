/** @jsx React.DOM */

/*

  wrapImmutables for simple React components

  wraps a component and passes down the .valueOf its own immutable props
  if a cursor is passed to a prop which name begins with 'on'
  a handler that updates the cursor is passed down instead

  example for two way binding of an input that has been wrapped
  <Input value={cursor} onChange={cursor} />

  other type of props are simply passed down

*/

var React = require('react');
var immutableRenderMixin = require('react-immutable-render-mixin');

module.exports = function wrapImmutables (Child) {
  var Parent = React.createClass({
    mixins: [ immutableRenderMixin ],
    render: function () {
      var immutableProps = {};
      for (var key in this.props) {
        var prop = this.props[key];
        if (!isImmutable(prop)) continue;
        // add listener that updates the cursor if prop key is like onX
        if (isCursor(prop) && /^on[A-Z]/.test(key)) {
          immutableProps[key] = function (value) {
            prop.update(function () { return value });
          };
        }
        else immutableProps[key] = prop.valueOf();
      }

      return <Child {...this.props} {...immutableProps} />;
    }
  });

  return Parent;
};

function isImmutable (potential) {
  return !!(potential && typeof potential.withMutations === 'function');
}

function isCursor (potential) {
  return !!(potential && typeof potential.deref === 'function');
}