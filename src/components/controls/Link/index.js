/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../nameHelper')('Link');
var wrapImmutables = require('../../wrapImmutables');
var bitnMixins = require('../../mixins/bitnMixins');

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