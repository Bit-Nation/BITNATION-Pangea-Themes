/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('Radio');
var wrapImmutables = require('../../lib/wrapImmutables');
var bitnMixins = require('../../lib/bitnMixins');

module.exports = wrapImmutables(React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    className: React.PropTypes.string,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func
  },
  render: function () {
    return (
      <input {...this.props}
        type='radio' value={null}
        onChange={this.props.onChange && this.onChange}
        className={nameHelper.join(
          nameHelper.className,
          this.props.className
        )} />
    );
  },
  onChange: function (event) {
    this.props.onChange(this.props.value);
  }
}));