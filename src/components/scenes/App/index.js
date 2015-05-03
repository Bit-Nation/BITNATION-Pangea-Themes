/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('App');
var bitnMixins = require('../../lib/bitnMixins');

var SiteNavigation = require('../../navigation/SiteNavigation');
var UserNavigation = require('../../navigation/UserNavigation');
var UserCover = require('../../user/UserCover');
var Main = require('../../routing/Main');

var Store = require('./Store');

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

    var minimized = cursor.get('minimized');
    var cover = stores.getIn(['layout', 'cover']);
    var coverHeight = stores.getIn(['layout', 'coverHeight']);
    var translucent;
    if (cover) {
      var scrollTop = stores.getIn(['window', 'scrollTop']);
      var panelSize = stores.getIn(['layout', 'panelSize']);
      translucent = scrollTop < coverHeight - (panelSize * 2);
    }

    var className = nameHelper.join(
      nameHelper.className,
      nameHelper.state({
        minimized: minimized,
        cover: cover
      }));

    return (
      <div className={className}>
        <SiteNavigation
          cursor={cursor.cursor('siteNavigation')}
          minimized={!minimized}
          onToggle={_.partial(Store.toggle, cursor, !minimized)} />

        <UserNavigation
          cursor={cursor.cursor('userNavigation')}
          minimized={minimized}
          translucent={translucent}
          onToggle={_.partial(Store.toggle, cursor, !minimized)}
          dispatch={this.props.dispatch} />

        <div>
          {cover &&
            <UserCover
              height={coverHeight}
              currentUser={stores.get('currentUser')} />}

          <Main cursor={cursor} stores={stores} />
        </div>
      </div>
    );
  }
});