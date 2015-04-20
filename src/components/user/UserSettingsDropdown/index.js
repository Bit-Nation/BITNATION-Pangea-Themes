/** @jsx React.DOM */
require('./style.scss');

var React = require('react/addons');
var classSet = React.addons.classSet;

var hoverMixin = require('../../mixins/hover');
var UserAvatar = require('../../user/UserAvatar');
var Menu = require('../../controls/Menu');

var UserSettingsDropdown = React.createClass({
  mixins: [ hoverMixin ],
  render: function () {
    var items = [
      {
        value: 'settings',
        content: 'Settings',
        onClick: this.props.onClick
      },
      {
        value: 'test',
        content: 'Test',
        onClick: this.props.onClick
      }
    ];

    var className = classSet({
      'bitn-user-settings-dropdown': true,
      'active': this.state.hover
    });

    return (
      <div className={className}
        onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
        
        <div className='toggle'>
          <span>Olfox Jensen</span>
          <UserAvatar size='medium' />
        </div>

        <Menu items={items} />
      </div>
    );
  }
});

module.exports = UserSettingsDropdown;