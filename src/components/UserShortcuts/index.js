/** @jsx React.DOM */
require('./style.scss');

var React = require('react/addons');
var classSet = React.addons.classSet;

var Menu = require('../Menu');

var UserShortcuts = React.createClass({
  render: function () {
    var items = [
      {
        value: 'siteNavigation',
        icon: 'bars',
        onClick: this.props.onClick
      },
      {
        value: 'search',
        icon: 'search',
        onClick: this.props.onClick
      },
      {
        value: 'messages',
        icon: 'envelope',
        onClick: this.props.onClick
      },
      {
        value: 'settings',
        icon: 'cog',
        onClick: this.props.onClick
      },
      {
        value: 'signOut',
        icon: 'sign-out',
        onClick: this.props.onClick
      }
    ];

    return (
      <Menu className='bitn-user-shortcuts' horizontal={true} items={items} />
    );
  },
});

module.exports = UserShortcuts;