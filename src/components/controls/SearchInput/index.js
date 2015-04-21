/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var component = require('../../component');

var TextInput = require('../../controls/TextInput');

module.exports = component('SearchInput', {
  propTypes: {
    className: React.PropTypes.string,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func,
    onSubmit: React.PropTypes.func
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
      <form className={className} onSubmit={this.onSubmit}>
        <TextInput value={this.state.value} onChange={this.onChange} />

        <button type='submit'>&rarr;</button>
      </form>
    )
  },
  onSubmit: function (event) {
    event.preventDefault();
    if (this.props.onSubmit) this.props.onSubmit(this.state.value);
  },
  onChange: function (value) {
    this.setState({ value: value });
    if (this.props.onChange) this.props.onChange(event.target.value);
  }
});