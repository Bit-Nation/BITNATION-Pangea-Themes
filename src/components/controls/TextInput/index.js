/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var component = require('../../component');

var _ = require('lodash');

module.exports = component('TextInput', {
  propTypes: {
    className: React.PropTypes.string,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func,
    onValue: React.PropTypes.func
  },
  getInitialState: function () {
    return {
      value: this.props.value
    };
  },
  componentWillReceiveProps: function (props) {
    this.setState({ value: props.value });
  },
  render: function () {
    var className = this.className();
    if (this.props.className) className += ' ' + this.props.className;

    return (
      <input type='text' {...this.props}
        className={className}
        value={this.state.value}
        onChange={this.onChange} />
    );
  },
  onChange: function (event) {
    this.setState({ value: event.target.value });
    if (this.props.onChange) this.props.onChange(event.target.value);
  }
});