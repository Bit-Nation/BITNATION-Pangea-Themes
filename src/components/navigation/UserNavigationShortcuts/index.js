/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('UserNavigationShortcuts');
var bitnMixins = require('../../lib/bitnMixins');
var Menu = require('../../controls/Menu');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  render: function () {
    var items = [
      {
        key: 'siteNavigation',
        icon: 'bars'
      },
      {
        key: 'search',
        icon: 'search'
      },
      {
        key: 'messages',
        icon: 'envelope'
      },
      {
        key: 'settings',
        icon: 'cog'
      },
      {
        key: 'signOut',
        icon: 'sign-out'
      }
    ];

    return (
      <Menu className={nameHelper.className}
        horizontal={true}
        items={items}
        onClick={this.props.onClick} />
    );
  },
});