/** @jsx React.DOM */

var React = require('react');
var Icon = require('.');

module.exports = function (params) {
  return <Icon type={params.type || 'search'} set={params.set} />;
};