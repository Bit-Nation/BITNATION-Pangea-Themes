/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');
var Input = require('../../controls/Input');

var Search = React.createClass({
  mixins: [ bitnMixin ],
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
    var button = this.props.button == null ? '&rarr;' : this.props.button;

    var className = this.className();
    if (this.props.className) className += ' ' + this.props.className;

    return (
      <form className={className} onSubmit={this.onSubmit}>
        <Input value={this.state.value} onChange={this.onChange} />

        {this.props.button !== false && this.props.button == null && 
          <button type='submit'>&rarr;</button>}

        {this.props.button !== false && this.props.button != null && 
          <button type='submit'>{this.props.button}</button>}
      </form>
    )
  },
  onSubmit: function (event) {
    event.preventDefault();
    if (this.props.onSubmit) this.props.onSubmit(this.state.value);
  },
  onChange: function (value) {
    this.setState({ value: value });
    if (this.props.onChange) this.props.onChange(value);
  }
});

module.exports = Search;