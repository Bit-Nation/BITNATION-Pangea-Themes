/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('Textarea');
var wrapImmutables = require('../../lib/wrapImmutables');
var bitnMixins = require('../../lib/bitnMixins');

module.exports = wrapImmutables(React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    className: React.PropTypes.string,
    cols: React.PropTypes.number,
    rows: React.PropTypes.number,
    maxlength: React.PropTypes.number,
    disabled: React.PropTypes.bool,
    wrap: React.PropTypes.string,
    name: React.PropTypes.string,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func
  },
  render: function () {
    return (
      <textarea {...this.props}
        className={nameHelper.join(
          nameHelper.className,
          this.props.className)}
        onChange={this.props.onChange && this.onChange} />
    );
  },
  onChange: function (event) {
    this.props.onChange(event.target.value);
  }
}));