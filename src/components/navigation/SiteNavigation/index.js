/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('SiteNavigation');
var bitnMixins = require('../../lib/bitnMixins');
var Menu = require('../../controls/Menu');

var _ = require('lodash');
var clickMessage = require('../../../messages/siteNavigation/click');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    siteNavigation: React.PropTypes.object.isRequired,
    layoutSizes: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  },
  render: function () {
    var siteNavigation = this.props.siteNavigation;
    var layoutSizes = this.props.layoutSizes;
    var currentUser = this.props.currentUser;

    var minimized = siteNavigation.get('minimized');
    var hidden = !currentUser.get('signedIn');
    var width = layoutSizes.get('panel');
    var minimizedWidth = layoutSizes.get('panelMinimized');

    var currentWidth = minimized ? minimizedWidth : width;
    var itemHeight = minimizedWidth * 0.75;
    var itemMargin = minimizedWidth - itemHeight;
    var baseMargin = itemMargin / 2;
    if (minimized) {
      itemMargin = baseMargin;
      baseMargin = null;
    }

    var menuStyle = {
      top: currentWidth,
      width: width
    };

    var childStyle = {
      marginTop: baseMargin,
      marginBottom: baseMargin
    };

    var styles = {
      listStyle: {
        paddingTop: baseMargin,
        paddingBottom: baseMargin
      },
      itemStyle: {
        minHeight: itemHeight,
        marginTop: itemMargin,
        marginBottom: itemMargin
      },
      linkStyle: {
        height: itemHeight,
        paddingLeft: itemMargin,
        paddingRight: itemMargin,
        lineHeight: itemHeight + 'px'
      },
      iconStyle: {
        width: itemHeight,
        height: itemHeight
      }
    };

    var child = _.clone(styles);
    child.style = childStyle;
    child.child = child;

    var className = nameHelper.join(
      nameHelper.className,
      nameHelper.state({
        minimized: minimized,
        hidden: hidden }));

    return (
      <nav className={className} style={{
        width: currentWidth,
        left: hidden ? -currentWidth : 0
      }}>
        <div className={nameHelper.ref('logo')}
          style={{height: currentWidth}} />

        <Menu {...styles} style={menuStyle} child={child}
          items={siteNavigation.get('items').toJS()}
          selected={siteNavigation.get('selected')}
          onSelect={_.flow(clickMessage, this.props.dispatch)} />
      </nav>
    );
  }
});