/*

  wrapImmutables for simple React components

  wraps a component and passes down the .valueOf its own immutable props
  if a cursor is passed to a prop which name begins with 'on'
  a handler that updates the cursor is passed down instead

  example for two way binding of an input that has been wrapped
  <Input value={cursor} onChange={cursor} />

  other type of props are simply passed down

*/

var wrapProps = require('./wrapProps');

module.exports = function wrapImmutables (Child) {
  return wrapProps(mapImmutables, Child);
};

function mapImmutables (props, oldProps, oldResult) {
  var result = {};
  
  Object.keys(props).forEach(function (key) {
    var prop = props[key];
    if (!isImmutable(prop)) result[key] = prop;
    else if (oldProps && Immutable.is(prop, oldProps[key]))
      result[key] = oldResult[key];
    // add listener that updates the cursor if prop key is like onX
    else if (isCursor(prop) && /^on[A-Z]/.test(key)) {
      result[key] = function (value) {
        prop.update(function () { return value });
      };
    }
    else result[key] = prop.valueOf();
  });

  return result;
}

function isImmutable (potential) {
  return !!(potential && typeof potential.withMutations === 'function');
}

function isCursor (potential) {
  return !!(potential && typeof potential.deref === 'function');
}