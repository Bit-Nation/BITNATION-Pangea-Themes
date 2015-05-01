/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('SiteNavigation');
var bitnMixins = require('../../lib/bitnMixins');
var Menu = require('../../controls/Menu');

var _ = require('lodash');

var items = require('./items');
var actions = require('./actions');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    cursor: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  },
  render: function () {
    var cursor = this.props.cursor;
    return (
      <nav className={nameHelper.join(
        nameHelper.className,
        nameHelper.state({ minimized: cursor.get('minimized')})
      )}>
        <div className={nameHelper.ref('logo')} />

        <Menu {...cursor.cursor('menu').toJS()}
          items={items}
          onClick={_.partial(actions.select, cursor)} />
      </nav>
    );
  }
});