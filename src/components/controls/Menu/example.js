/** @jsx React.DOM */

var React = require('react');
var Menu = require('.');

var items = require('./exampleItems');

module.exports = function (params) {
  return <Menu items={items} />;
};