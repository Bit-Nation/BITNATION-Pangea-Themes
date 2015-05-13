/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');

var Input = React.createClass({
  mixins: [ bitnMixin ],
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
        className={this.classNameWithProp()}
        onChange={this.props.onChange && this.onChange} />
    );
  },
  onChange: function (event) {
    this.props.onChange(event.target.value);
  }
});

module.exports = Input;