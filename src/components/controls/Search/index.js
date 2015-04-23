/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');
var Input = require('../../controls/Input');
var Icon = require('../../controls/Icon');

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
    var button = this.props.button;
    if (button == null) button = <Icon type='search' />;

    var className = this.className();
    if (this.props.className) className += ' ' + this.props.className;

    return (
      <form className={className} onSubmit={this.onSubmit}>
        <div>
          <Input value={this.state.value} onChange={this.onChange} />
        </div>

        {this.props.button !== false &&
          <button type='submit'>{button}</button>}
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