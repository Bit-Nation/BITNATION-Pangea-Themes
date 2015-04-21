/** @jsx React.DOM */
require('./style.scss');

var React = require('react/addons');
var classSet = React.addons.classSet;

var UserShortcuts = require('../../navigation/UserShortcuts');
var UserSettingsDropdown = require('../../user/UserSettingsDropdown');
var UserCover = require('../../user/UserCover');

var UserNavigation = React.createClass({
  render: function () {
    return (
      <div className={classSet({
        'bitn-user-navigation': true,
        'cover': this.props.cover
      })}>
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

module.exports = UserNavigation;