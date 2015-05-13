/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('PageRow');
var bitnMixins = require('../../lib/bitnMixins');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    className: React.PropTypes.string
  },
  render: function () {
    return (
      <div className={nameHelper.join(
        nameHelper.className,
        this.props.className
      )}>
        {this.props.children}
      </div>
    );
  }
});