/** @jsx React.DOM */

var React = require('react');
var SiteNavigation = require('.');
var items = require('../Menu/exampleItems');

module.exports = function (params) {
  return <SiteNavigation menuItems={items} minimized={params.minimized} />;
};