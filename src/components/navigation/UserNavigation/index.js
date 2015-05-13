/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('UserNavigation');
var bitnMixins = require('../../lib/bitnMixins');
var UserNavigationShortcuts = require('../UserNavigationShortcuts');
var UserSettingsDropdown = require('../../user/UserSettingsDropdown');

var minimizeMessage = require('../../../messages/siteNavigation/minimize');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    left: React.PropTypes.number,
    minimized: React.PropTypes.bool,
    cover: React.PropTypes.bool,
    userNavigation: React.PropTypes.object.isRequired,
    layoutSizes: React.PropTypes.object.isRequired,
    windowStore: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  },
  render: function () {
    var userNavigation = this.props.userNavigation;
    var layoutSizes = this.props.layoutSizes;
    var windowStore = this.props.windowStore;
    var currentUser = this.props.currentUser;

    var height = layoutSizes.get('panelMinimized');
    var scrollStop = layoutSizes.get('coverHeight') - (height * 2);

    var fade = false;
    if (this.props.cover)
      fade = windowStore.get('scrollTop') < scrollStop;

    if (typeof fade != 'number') fade = fade ? 1 : 0;

    var className = nameHelper.join(
      nameHelper.className,
      nameHelper.state({
        minimized: this.props.minimized,
        fade: fade > 0.5 }));

    return (
      <nav className={className} style={{
        left: this.props.left,
        height: height
      }}>
        <div className={nameHelper.ref('opaqueLayer')}
          style={{ opacity: fade ? 1 - fade : null }} />
        <div className={nameHelper.ref('fadeLayer')}
          style={{ opacity: fade ? fade : null }} />

        {currentUser.get('signedIn') && [
          <UserSettingsDropdown />,
          <UserNavigationShortcuts onClick={this.onClick} />]}
      </nav>
    );
  },
  onClick: function (keys) {
    if (keys[0] == 'menu') 
      this.props.dispatch(minimizeMessage());
  }
});