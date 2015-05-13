// a bit of a hack

var _ = require('lodash');

var classNameMixin = require('./classNameMixin');
var formIdMixin = require('./formIdMixin');
var cloneChildrenMixin = require('./cloneChildrenMixin');

module.exports = _.extend(
  _.extend(
    classNameMixin('bitn'),
    formIdMixin('bitn-form-id')
  ),
  cloneChildrenMixin
);