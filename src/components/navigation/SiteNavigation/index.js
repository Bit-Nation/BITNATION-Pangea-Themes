/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');
var Menu = require('../../controls/Menu');

var SiteNavigation = React.createClass({
  mixins: [ bitnMixin ],
  render: function () {
    var className = this.className();
    if (this.props.minimized) className += ' ' + this.stateName('minimized');

    return (
      <nav className={className}>
        <div className={this.refName('logo')} />

        <Menu
          items={this.props.menuItems}
          selected={this.props.minimized ? false : null}
          onClick={this.props.onMenuClick}
          onSelect={this.props.onMenuSelect} />
      </nav>
    );
  }
});

module.exports = SiteNavigation;