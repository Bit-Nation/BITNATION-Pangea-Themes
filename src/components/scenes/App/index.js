/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var component = require('../../component');

var SiteNavigation = require('../../navigation/SiteNavigation');
var UserNavigation = require('../../navigation/UserNavigation');
var NotaryForm = require('../../notary/NotaryForm');

module.exports = component('App', {
  render: function () {
    var actions = [
      {
        icon: 'bars',
        onClick: this.toggleSiteNavigation
      },
      {
        icon: 'search',
        href: '#search'
      },
      {
        icon: 'envelope',
        onClick: this.toggleSiteNavigation
      },
      {
        icon: 'cog',
        href: '#search'
      },
      {
        icon: 'sign-out',
        href: '#search'
      }
    ];

    return (
      <div className={this.className()}>
        <SiteNavigation {...this.props.siteNavigation}
          minimized={this.state.expanded} onMenuSelect={this.minimize} />
        <div>
          <UserNavigation onAction={this.onAction}
          cover={this.props.cover && { height: 300 }} />
          <main>
            <NotaryForm />
          </main>
        </div>
      </div>
    );
  },
  getInitialState: function () {
    return {
      expanded: false
    };
  },
  onAction: function (type) {
    if (type == 'siteNavigation')
      this.setState({ expanded: !this.state.expanded });
  },
  expand: function () {
    this.setState({ expanded: true });
  },
  minimize: function () {
    this.setState({ expanded: false });    
  }
});