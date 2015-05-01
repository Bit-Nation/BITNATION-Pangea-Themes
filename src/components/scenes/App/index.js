/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('App');
var bitnMixins = require('../../lib/bitnMixins');

var SiteNavigation = require('../../navigation/SiteNavigation');
var UserNavigation = require('../../navigation/UserNavigation');
var NotaryPage = require('../../pages/NotaryPage');
var MailPage = require('../../pages/MailPage');

var siteNavigationActions = require('../../navigation/SiteNavigation/actions');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    cursor: React.PropTypes.object.isRequired,
    stores: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  },
  render: function () {
    var cursor = this.props.cursor;
    var stores = this.props.stores;

    var route = stores.getIn(['routing', 'route']);
    var params = stores.getIn(['routing', 'params']);

    var cover;
    var page;
    if (route) {
      if (route[0] == 'notary') page = (
        <NotaryPage
          cursor={cursor.cursor('notaryPage')}
          stores={stores}
          dispatch={this.props.dispatch} />
      )
      else if (route[0] == 'mail') page = (
        <MailPage
          dispatch={this.props.dispatch} />
      )
      else if (route[0] == 'notFound') page = (
        <h1>This page was never here. Stop bothering me!</h1>
      );
    }
    
    if (route && route[0] == 'notary') cover = {
      title: ['Welcome to your ', <b>Bitnation</b>],
      text: 'In the pursuit of serfdom'
    };

    return (
      <div className={nameHelper.className}>
        <SiteNavigation
          cursor={cursor.cursor('siteNavigation')}
          dispatch={this.props.dispatch} />
        <div>
          <UserNavigation onShortcut={this.onShortcut} cover={cover} />
          <main>
            {page}
          </main>
        </div>
      </div>
    );
  },
  onShortcut: function (keys) {
    if (keys[0] == 'siteNavigation')
      siteNavigationActions.toggle(this.props.cursor.cursor('siteNavigation'));
  }
});