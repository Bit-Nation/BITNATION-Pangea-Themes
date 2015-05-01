/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('UserSettingsDropdown');
var bitnMixins = require('../../lib/bitnMixins');
var hoverMixin = require('../../lib/hoverMixin');
var UserAvatar = require('../../user/UserAvatar');
var Menu = require('../../controls/Menu');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins.concat(hoverMixin),
  render: function () {
    var items = [
      {
        key: 'settings',
        link: 'Settings'
      },
      {
        key: 'test',
        link: 'Test'
      }
    ];

    var className = nameHelper.join(
      nameHelper.className,
      nameHelper.state({ active: this.state.hover }));

    return (
      <div className={className}
        onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
        
        <div className={nameHelper.ref('toggle')}>
          <span>Olfox Jensen</span>
          <UserAvatar size='medium' />
        </div>

        <Menu items={items} onClick={this.props.onClick} />
      </div>
    );
  }
});