/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');

var Textarea = React.createClass({
  mixins: [ bitnMixin ],
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
        className={this.classNameWithProp()}
        onChange={this.props.onChange && this.onChange} />
    );
  },
  onChange: function (event) {
    this.props.onChange(event.target.value);
  }
});

module.exports = Textarea;