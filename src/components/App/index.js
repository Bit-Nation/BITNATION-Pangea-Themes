/** @jsx React.DOM */
require('./style.scss');

var React = require('react/addons');
var classSet = React.addons.classSet;

var SiteNavigation = require('../SiteNavigation');
var UserNavigation = require('../UserNavigation');

var App = React.createClass({
  render: function () {
    var actions = [
      {
        icon: 'fa fa-bars',
        onClick: this.toggleSiteNavigation
      },
      {
        icon: 'fa fa-search',
        href: '#search'
      },
      {
        icon: 'fa fa-envelope',
        onClick: this.toggleSiteNavigation
      },
      {
        icon: 'fa fa-cog',
        href: '#search'
      },
      {
        icon: 'fa fa-sign-out',
        href: '#search'
      }
    ];

    return (
      <div className='bitn-app'>
        <SiteNavigation {...this.props.siteNavigation} minimized={this.state.minimized} />
        <UserNavigation actions={actions} />
      </div>
    );
  },
  getInitialState: function () {
    return {
      minimized: null
    };
  },
  toggleSiteNavigation: function (name) {
    this.setState({ minimized: !this.state.minimized });
  }
});

module.exports = App;