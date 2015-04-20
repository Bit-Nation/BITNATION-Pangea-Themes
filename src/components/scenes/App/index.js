/** @jsx React.DOM */
require('./style.scss');

var React = require('react/addons');
var classSet = React.addons.classSet;

var SiteNavigation = require('../../navigation/SiteNavigation');
var UserNavigation = require('../../navigation/UserNavigation');
var NotaryForm = require('../../notary/NotaryForm');

var App = React.createClass({
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
      <div className='bitn-app'>
        <SiteNavigation {...this.props.siteNavigation} minimized={this.state.expanded} />
        <div>
          <UserNavigation onAction={this.onAction} />
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
  }
});

module.exports = App;