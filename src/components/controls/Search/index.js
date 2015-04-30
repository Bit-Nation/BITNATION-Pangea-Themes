/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../nameHelper')('Search');
var wrapImmutables = require('../../wrapImmutables');
var bitnMixins = require('../../mixins/bitnMixins');
var focusMixin = require('../../mixins/focusMixin');
var Input = require('../../controls/Input');
var Icon = require('../../controls/Icon');

module.exports = wrapImmutables(React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins.concat(focusMixin),
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

    var className = nameHelper.join(
      nameHelper.className,
      this.props.className,
      nameHelper.state({ focus: this.state.focus }));
    
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
}));