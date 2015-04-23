var _ = require('lodash');

module.exports = function (prefix) {
  var prefixed = (prefix ? prefix + '-' : '');

  return {
    statics: {
      className: function () {
        return prefixed + hyphenate(this.displayName);
      },
      stateName: function (name) {
        return this.className() + '--state-' + hyphenate(name);
      },
      refName: function (name) {
        return this.className() + '--ref-' + hyphenate(name);
      }
    },
    componentWillMount: function () {
      this.classRefs = {};
    },

    // ugly but much cleaner components
    className: function () {
      return this.constructor.className.apply(this.constructor, arguments);
    },
    stateName: function () {
      return this.constructor.stateName.apply(this.constructor, arguments);
    },
    refName: function () {
      return this.constructor.refName.apply(this.constructor, arguments);
    },

    classReferrer: function (name) {
      var component = this;
      return function (refComponent) {
        component.classRefs[name] = refComponent;
      };
    },
    classRef: function (name, otherClassName) {
      var className = this.constructor.refName(name);
      if (otherClassName) className += ' ' + otherClassName;

      return {
        ref: this.classReferrer(name),
        className: className
      };
    }
  };
};

function hyphenate (name) {
  return _.snakeCase(name).replace(/_/g, '-');
}