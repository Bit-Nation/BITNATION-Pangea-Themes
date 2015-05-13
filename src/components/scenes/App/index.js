/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('App');
var bitnMixins = require('../../lib/bitnMixins');

var SiteNavigation = require('../../navigation/SiteNavigation');
var UserNavigation = require('../../navigation/UserNavigation');
var PageCover = require('../../layout/PageCover');
var Main = require('../../routing/Main');

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
    var dispatch = this.props.dispatch;

    var routingOptions = stores.routing.getCurrentOptions();
    var cover = routingOptions && routingOptions.get('cover');
    if (cover) cover = cover.toJS ? cover.toJS() : {};

    var minimized =
      !stores.currentUser.get('signedIn') &&
      !stores.siteNavigation.get('minimized');

    var left = 0;
    if (stores.currentUser.get('signedIn')) {
      if (stores.siteNavigation.get('minimized'))
        left = stores.layoutSizes.get('panelMinimized'); 
      else
        left = stores.layoutSizes.get('panel'); 
    }

    var className = nameHelper.join(
      nameHelper.className,
      nameHelper.state({
        minimized: minimized,
        cover: cover }));

    return (
      <div className={className}>
        <SiteNavigation
          siteNavigation={stores.siteNavigation}
          layoutSizes={stores.layoutSizes}
          currentUser={stores.currentUser}
          dispatch={dispatch} />

        <UserNavigation
          left={left}
          minimized={minimized}
          cover={cover}
          userNavigation={stores.userNavigation}
          layoutSizes={stores.layoutSizes}
          windowStore={stores.window}
          currentUser={stores.currentUser}
          dispatch={dispatch} />

        <div style={{ marginLeft: left }}>
          {cover &&
            <PageCover {...cover}
              height={stores.layoutSizes.get('coverHeight')} />}

          <Main cursor={cursor} stores={stores} dispatch={dispatch} />
        </div>
      </div>
    );
  }
});