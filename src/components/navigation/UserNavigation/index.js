/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');
var UserShortcuts = require('../../navigation/UserShortcuts');
var UserSettingsDropdown = require('../../user/UserSettingsDropdown');
var UserCover = require('../../user/UserCover');

var UserNavigation = React.createClass({
  mixins: [ bitnMixin ],
  render: function () {
    var className = this.className();
    if (this.props.cover) className += ' ' + this.stateName('cover');

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

module.exports = UserNavigation;