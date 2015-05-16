/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('Main');
var bitnMixins = require('../../lib/bitnMixins');

var DashboardPage = require('../../pages/DashboardPage');
var SignInPage = require('../../pages/SignInPage');
var NotaryPage = require('../../pages/NotaryPage');
var MailPage = require('../../pages/MailPage');
var DappsPage = require('../../pages/DappsPage');

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
    var route = stores.routing.get('current');
    var keys = route.get('keys');

    var page;
    if (keys) {
      var props = {
        route: keys && keys.size > 1 ? keys.slice(1) : null,
        params: route.get('params'),
        dispatch: this.props.dispatch
      };

      switch (keys.get(0)) {
        case '$':
          page = <DashboardPage {...props} />;
          break;
        case 'sign-in':
          page = <SignInPage {...props}
            cursor={cursor.cursor(['pages', 'sign-in'])} />;
          break;
        case 'notary':
          page = <NotaryPage {...props}
            cursor={cursor.cursor(['pages', 'notary'])}
            notary={stores.notary} />;
          break;
        case 'mail':
          page = <MailPage {...props} />;
          break;
        case 'dapps':
          page = <DappsPage {...props} />;
          break;
        case 'notFound':
          page = (
            <div>
              <h1>&ldquo;All that is gold does not glitter,</h1>
              <h1>Not all those who wander are lost;&rdquo;</h1>
              <h2>But I think you are... This page doesn&lsquo;t exist</h2>
            </div>
          );
          break;
      }
    }
    else page = 'Loading...';

    return (
      <main className={nameHelper.className}>
        {page}
      </main>
    );
  }
});