/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('UserNavigation');
var bitnMixins = require('../../lib/bitnMixins');
var UserShortcuts = require('../../navigation/UserShortcuts');
var UserSettingsDropdown = require('../../user/UserSettingsDropdown');
var UserCover = require('../../user/UserCover');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  render: function () {
    return (
      <div className={nameHelper.join(
        nameHelper.className,
        nameHelper.state({ cover: this.props.cover })
      )}>
        <nav>
          <UserShortcuts onClick={this.props.onShortcut} />
          <UserSettingsDropdown />
        </nav>
        
        {this.props.cover &&
          <UserCover {...this.props.cover} />}
      </div>
    );
  }
});