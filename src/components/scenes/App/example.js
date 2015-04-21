/** @jsx React.DOM */

var React = require('react');
var App = require('.');
var items = require('../../controls/Menu/exampleItems');

module.exports = function (params) {
  return (
    <App
    cover={params.cover}
    siteNavigation={{
      menuItems: items
    }} />
  );
};