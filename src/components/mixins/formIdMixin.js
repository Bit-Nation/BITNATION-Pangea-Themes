var _ = require('lodash');

module.exports = function (prefix) {
  if (!prefix) prefix = 'form-id';

  return {
    getInitialState: function () {
      return {
        formId: prefix + '-' + _.uniqueId()
      }
    },
    formId: function (name) {
      return this.state.formId + '-' + name;
    },
    formIds: function (name) {
      return {
        name: name,
        id: this.formId(name)
      };
    }
  };
};