/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('Link');
var wrapImmutables = require('../../lib/wrapImmutables');
var bitnMixins = require('../../lib/bitnMixins');

module.exports = wrapImmutables(React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    className: React.PropTypes.string,
    children: React.PropTypes.node
  },
  render: function () {
    return (
      <a {...this.props} className={nameHelper.join(
        nameHelper.className,
        this.props.className
      )}>
        {this.props.children}
      </a>
    )
  }
}));