/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var component = require('../../component');

var Menu = require('../../controls/Menu');

module.exports = component('SiteNavigation', {
  render: function () {
    var className = this.className();
    if (this.props.minimized) className += ' minimized';

    return (
      <nav className={className}>
        <div className='logo' />

        <Menu
          items={this.props.menuItems}
          selected={this.props.minimized ? false : null}
          onClick={this.props.onMenuClick}
          onSelect={this.props.onMenuSelect} />
      </nav>
    );
  }
});