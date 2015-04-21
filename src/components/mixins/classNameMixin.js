var _ = require('lodash');

module.exports = function (prefix) {
  return {
    className: function (otherName) {
      var name = otherName || this.constructor.displayName;
      var hyphenated = _.snakeCase(name).replace(/_/g, '-');
      return (prefix ? prefix + '-' : '') + hyphenated;
    }
  };
};