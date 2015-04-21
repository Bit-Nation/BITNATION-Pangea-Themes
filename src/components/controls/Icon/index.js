/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var component = require('../../component');

module.exports = component('Icon', {
  render: function () {
    var className = this.className();
    if (this.props.className) className += ' ' + this.props.className;
    if (this.props.highlight) className += ' highlight';

    var set = this.props.set !== undefined ? this.props.set : 'fa';
    if (set == 'fa') {
      className += ' fa';
      className += ' fa-' + this.props.type;
      if (this.props.large) className += ' fa-2x';
    }
    else if (set == 'xbnx') {
      className += ' xbnx-icon';
      className += ' icon-' + this.props.type;
      if (this.props.highlight) className += ' xbnx-icon-highlight';
    }

    return (
      <i className={className} />
    );
  },
});