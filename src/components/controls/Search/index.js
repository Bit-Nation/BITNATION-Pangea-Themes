/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');
var focusMixin = require('../../mixins/focusMixin');
var Input = require('../../controls/Input');
var Icon = require('../../controls/Icon');

var Search = React.createClass({
  mixins: [ bitnMixin, focusMixin ],
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

    var className = this.classNameWithProp();
    if (this.state.focus) className += ' ' + this.stateName('focus');

    return (
      <form className={className} onSubmit={this.onSubmit}>
        <div>
          <Input value={this.state.value} onChange={this.onChange}
            onFocus={this.onFocus} onBlur={this.onBlur} />
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