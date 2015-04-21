/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var component = require('../../component');

var hoverMixin = require('../../mixins/hoverMixin');
var UserAvatar = require('../../user/UserAvatar');
var Menu = require('../../controls/Menu');

module.exports = component('UserSettingsDropdown', {
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

    var className = this.className();
    if (this.state.hover) className += ' active';

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