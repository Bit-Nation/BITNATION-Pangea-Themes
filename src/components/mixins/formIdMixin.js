var _ = require('lodash');

var ids = {};

module.exports = function (prefix, raw) {
  if (!prefix) prefix = 'form-id';
  else if (!raw) prefix = hyphenate(prefix);

  if (!ids[prefix]) ids[prefix] = 0;

  var parseName = function () {
      var parts = [];
      for (var i = 0; i < arguments.length; i++) {
        parts.push(raw ? arguments[i] : hyphenate(arguments[i]));
      }
      return parts.join('-');
  };

  return {
    getInitialState: function () {
      return {
        formId: prefix + '-' + ids[prefix]++
      }
    },
    formId: function () {
      var name = parseName.apply(null, arguments);
      return this.state.formId + '-' + name;
    },
    formIds: function () {
      var name = parseName.apply(null, arguments);
      return {
        name: name,
        id: this.formId(name)
      };
    }
  };
};

function hyphenate (name) {
  return _.snakeCase(name).replace(/_/g, '-');
}