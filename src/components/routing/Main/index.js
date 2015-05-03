/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('Main');
var bitnMixins = require('../../lib/bitnMixins');
var NotaryPage = require('../../pages/NotaryPage');
var MailPage = require('../../pages/MailPage');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    cursor: React.PropTypes.object.isRequired,
    stores: React.PropTypes.object.isRequired
  },
  render: function () {
    var cursor = this.props.cursor;
    var stores = this.props.stores;
    var routing = stores.get('routing');

    var Page;
    var props = {};

    if (routing) {
      var route = routing.get('route');
      if (!route) {
        Page = 'div';
        props.children = [ <h1>Start!?</h1> ];
      }
      else if (route[0] == 'notary') {
        Page = NotaryPage;
        props.cursor = cursor.cursor('notaryPage');
        props.stores = stores;
      }
      else if (route[0] == 'mail') {
        Page = MailPage;
      }
      else {
        Page = 'div';
        props.children = [
          <h1>This page was never here. Stop bothering me!</h1> ];
      }
    }

    return (
      <main className={nameHelper.className}>
        {Page &&
          <Page {...props} />}

        {!Page &&
          'Loading...'}
      </main>
    );
  }
});