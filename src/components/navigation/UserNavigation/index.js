/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var component = require('../../component');

var UserShortcuts = require('../../navigation/UserShortcuts');
var UserSettingsDropdown = require('../../user/UserSettingsDropdown');
var UserCover = require('../../user/UserCover');

module.exports = component('UserNavigation', {
  render: function () {
    var className = this.className();
    if (this.props.cover) className += ' cover';

    return (
      <div className={className}>
        <nav>
          <UserShortcuts onClick={this.props.onAction} />
          <UserSettingsDropdown />
        </nav>
        
        {this.props.cover &&
          <UserCover {...this.props.cover} />}
      </div>
    );
  }
});