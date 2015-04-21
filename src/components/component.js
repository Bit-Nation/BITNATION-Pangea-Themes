var _ = require('lodash');
var React = require('react');

var prefix = 'bitn';

var mixins = [];

module.exports = function (displayName, options) {
  var classOptions = _.extend(_.clone(options), {
    displayName: displayName,
    className: function (otherName) {
      return toClassName(otherName || displayName);
    },
    mixins: options.mixins ? mixins.concat(options.mixins) : mixins
  });
  
  return React.createClass(classOptions);
};

function toClassName (displayName) {
  var name = _.snakeCase(displayName).replace(/_/g, '-');
  return prefix + '-' + name;
}