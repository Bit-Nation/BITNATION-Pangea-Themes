/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');

var Radio = React.createClass({
  mixins: [ bitnMixin ],
  propTypes: {
    className: React.PropTypes.string,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func
  },
  render: function () {
    return (
      <input {...this.props} value={null}
        type='radio' className={this.classNameWithProp()}
        onChange={this.props.onChange && this.onChange} />
    );
  },
  onChange: function (event) {
    this.props.onChange(this.props.value);
  }
});

module.exports = Radio;