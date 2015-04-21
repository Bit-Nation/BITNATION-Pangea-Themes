/** @jsx React.DOM */

var React = require('react');
var Paginator = require('.');

module.exports = function (params) {
  return <Paginator page={3} max={10} size={4} />;
};