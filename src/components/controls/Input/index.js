/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../nameHelper')('Input');
var wrapImmutables = require('../../wrapImmutables');
var bitnMixins = require('../../mixins/bitnMixins');

module.exports = wrapImmutables(React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    className: React.PropTypes.string,
    type: React.PropTypes.string,
    email: React.PropTypes.bool,
    password: React.PropTypes.bool,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func
  },
  render: function () {
    var type = 'text';
    if (this.props.type) type = this.props.type;
    if (this.props.email) type = 'email';
    if (this.props.password) type = 'password';

    return (
      <input {...this.props}
        type={type}
        className={nameHelper.join(
          nameHelper.className,
          this.props.className
        )}
        onChange={this.props.onChange && this.onChange} />
    );
  },
  onChange: function (event) {
    this.props.onChange(event.target.value);
  }
}));