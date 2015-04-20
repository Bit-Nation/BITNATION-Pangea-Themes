/** @jsx React.DOM */
require('./style.scss');

var React = require('react/addons');
var classSet = React.addons.classSet;

var UserShortcuts = require('../UserShortcuts');
var UserSettingsDropdown = require('../UserSettingsDropdown');
var UserCover = require('../UserCover');

var UserNavigation = React.createClass({
  render: function () {
    return (
      <div className='bitn-user-navigation'>
        <nav>
          <UserShortcuts onClick={this.props.onAction} />
          <UserSettingsDropdown />
        </nav>
        
        <UserCover />
      </div>
    );
  }
});

module.exports = UserNavigation;