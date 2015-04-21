/** @jsx React.DOM */
require('./style.scss');

var React = require('react/addons');
var classSet = React.addons.classSet;

var Menu = require('../../controls/Menu');

var SiteNavigation = React.createClass({
  render: function () {
    var className = classSet({
      'bitn-site-navigation': true,
      'minimized': this.props.minimized
    });

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

module.exports = SiteNavigation;