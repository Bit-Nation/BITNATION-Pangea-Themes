/** @jsx React.DOM */
require('./style.scss');

var React = require('react/addons');
var classSet = React.addons.classSet;

var Menu = require('../Menu');

var UserNavigation = React.createClass({
  render: function () {
    return (
      <nav className='bitn-user-navigation'>
        <Menu className='actions' horizontal={true} items={this.props.actions} />
      </nav>
    );
  }
});

module.exports = UserNavigation;