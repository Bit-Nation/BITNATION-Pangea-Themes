/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('UserNavigation');
var bitnMixins = require('../../lib/bitnMixins');
var UserNavigationShortcuts = require('../UserNavigationShortcuts');
var UserSettingsDropdown = require('../../user/UserSettingsDropdown');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    cursor: React.PropTypes.object.isRequired,
    minimized: React.PropTypes.bool,
    translucent: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.numbber
    ]),
    onToggle: React.PropTypes.func.isRequired,
    dispatch: React.PropTypes.func.isRequired
  },
  render: function () {
    var translucency = this.props.translucent;
    if (typeof translucency != 'number')
      translucency = translucency ? 1 : 0;

    var className = nameHelper.join(
      nameHelper.className,
      nameHelper.state({
        minimized: this.props.minimized,
        translucent: translucency > 0.5 }));

    return (
      <nav className={className}>
        <div className={nameHelper.ref('opaqueLayer')}
          style={{ opacity: translucency ? 1 - translucency : null }} />
        <div className={nameHelper.ref('translucentLayer')}
          style={{ opacity: translucency ? translucency : null }} />

        <UserSettingsDropdown />
        <UserNavigationShortcuts onClick={this.onClick} />
      </nav>
    );
  },
  onClick: function (keys) {
    if (keys[0] == 'menu') this.props.onToggle();
  }
});