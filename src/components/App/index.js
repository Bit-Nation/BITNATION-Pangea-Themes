/** @jsx React.DOM */
require('./style.scss');

var Bitnation = require('../../bitnation/bitnation.core');

var React = require('react/addons');
var classSet = React.addons.classSet;

var SiteNavigation = require('../SiteNavigation');
var UserNavigation = require('../UserNavigation');
var NotaryForm = require('../Notary/Form');

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
        <div id="balls" style={{ width: '100%' }}>
          <UserNavigation actions={actions} />
          <div style={{padding: '1rem'}}>
            <NotaryForm />
          </div>
        </div>
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