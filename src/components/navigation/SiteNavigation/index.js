/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('SiteNavigation');
var bitnMixins = require('../../lib/bitnMixins');
var Menu = require('../../controls/Menu');

var Store = require('./Store');
var _ = require('lodash');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    cursor: React.PropTypes.object.isRequired,
    onToggle: React.PropTypes.func.isRequired
  },
  render: function () {
    var cursor = this.props.cursor;
    var className = nameHelper.join(
      nameHelper.className,
      nameHelper.state({ minimized: this.props.minimized }));

    return (
      <nav className={className}>
        <div className={nameHelper.ref('logo')} />

        <Menu {...cursor.toJS()}
          onClick={this.onClick} />
      </nav>
    );
  },
  onClick: function (keys) {
    var result = Store.select(this.props.cursor, keys);
    if (!this.props.minimized) return;
    var selected = result.get('selected');
    if (!selected) return;
    var item = Store.get(result, selected);
    if (!item || !item.get('items')) return;
    this.props.onToggle();
  }
});