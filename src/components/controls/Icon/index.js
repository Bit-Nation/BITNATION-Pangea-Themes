/** @jsx React.DOM */
require('./style.scss');

var React = require('react/addons');
var classSet = React.addons.classSet;

var Icon = React.createClass({
  render: function () {
    var set = this.props.set !== undefined ? this.props.set : 'fa';
    var className = classSet({
      'bitn-icon': true,
      'bitn-icon-highlight': this.props.highlight,

      'fa': set == 'fa',
      'fa-2x': set == 'fa' && this.props.large,

      'xbnx-icon': set == 'xbnx',
      'xbnx-icon-highlight': set == 'xbnx' && this.props.highlight,
    });

    if (set == 'fa') className += ' fa-' + this.props.type;
    if (set == 'xbnx') className += ' icon-' + this.props.type;

    if (this.props.className) className += ' ' + this.props.className;

    return (
      <i className={className} />
    );
  },
});

module.exports = Icon;