/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../nameHelper')('Icon');
var wrapImmutables = require('../../wrapImmutables');
var bitnMixins = require('../../mixins/bitnMixins');

module.exports = wrapImmutables(React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    className: React.PropTypes.string,
    set: React.PropTypes.string,
    type: React.PropTypes.string,
    highlight: React.PropTypes.bool,
    large: React.PropTypes.bool
  },
  render: function () {
    var className = nameHelper.join(
      nameHelper.className,
      this.props.className,
      nameHelper.state({ highlight: this.props.highlight }));

    var set = this.props.set !== undefined ? this.props.set : 'fa';
    if (set == 'fa') {
      className += ' fa';
      if (this.props.type) className += ' fa-' + this.props.type;
      if (this.props.large) className += ' fa-2x';
    }
    else if (set == 'xbnx') {
      className += ' xbnx-icon';
      if (this.props.type) className += ' icon-' + this.props.type;
      if (this.props.highlight) className += ' xbnx-icon-highlight';
    }

    return (
      <i className={className} />
    );
  }
}));