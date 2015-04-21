var _ = require('lodash');
var React = require('react');

var classNameMixin = require('./mixins/classNameMixin');
var formIdMixin = require('./mixins/formIdMixin');
var cloneChildrenMixin = require('./mixins/cloneChildrenMixin');

var mixins = [
  classNameMixin('bitn'),
  formIdMixin('bitn-form-id'),
  cloneChildrenMixin
];

module.exports = function (displayName, options) {
  var classOptions = _.extend(_.clone(options), {
    displayName: displayName,
    mixins: options.mixins ? mixins.concat(options.mixins) : mixins
  });
  
  return React.createClass(classOptions);
};