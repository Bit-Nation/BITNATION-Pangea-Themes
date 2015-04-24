/** @jsx React.DOM */

var React = require('react');
var App = require('.');
var items = require('../../controls/Menu/exampleItems');

module.exports = function (params) {
  return (
    <App
    cover={params.cover && {
      text: 'In the pursuit of serfdom',
      children: [ 'Welcome to your ', <b>Bitnation</b> ]
    }}
    page={params.page}
    siteNavigation={{
      menuItems: items
    }} />
  );
};