var _ = require('lodash');

/*

  NameHelper for React / web components
  
  creates classNames for components, refs and states
  all special classNames can be written in camelCase
  as to match the structure of a React component

  example uses
  
  var nameHelper = new NameHelper('pre-fix', 'MessageList')

  var className = nameHelper.join(
    nameHelper.className,
    nameHelper.state({
      active: true,
      focus: expression
    }),
    expression && this.props.className
  );

  <ul className={nameHelper.ref('list')} />

  <li className={nameHelper.state('selected', 'hasChildren')} />

  <a className={nameHelper.join(
    nameHelper.ref('updateTrigger'),
    isUpdating && nameHelper.state('updating'),
    'pure-button'
  )} />

*/


var NameHelper = module.exports = function NameHelper (prefix, displayName) {
  if (!displayName) {
    displayName = prefix;
    prefix = null;
  }

  this.prefix = prefix;
  this.displayName = displayName;
  this.className = (prefix ? prefix + '-' : '') + hyphenate(displayName);
};

NameHelper.prototype.join = function (args__) {
  var result = [];
  for (var i = 0; i < arguments.length; i++) {
    if (!arguments[i]) continue;

    if (typeof arguments[i] == 'object') {
      for (var key in arguments[i]) {
        if (arguments[i][key]) result.push(key);
      }
    }
    else result.push(arguments[i]);
  }
  return result.join(' ');
};

NameHelper.prototype.state = function (name) {
  if (arguments.length > 1) {
    var states = [];
    for (var i = 0; i < arguments.length; i++) {
      states.push(this.state(arguments[i]));
    }
    return states.join(' ');
  }

  if (typeof name == 'object') {
    var states = [];
    for (var key in name) {
      if (name[key]) states.push(this.state(key));
    }
    return states.join(' ');
  }

  return this.className + '--state-' + hyphenate(name);
};

NameHelper.prototype.ref = function (name) {
  return this.className + '--ref-' + hyphenate(name);
};

function hyphenate (name) {
  return _.snakeCase(name).replace(/_/g, '-');
}