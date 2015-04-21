/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var component = require('../../component');

module.exports = component('UserAvatar', {
  render: function () {
    var className = this.className();
    if (this.props.size == 'medium') className += ' medium';
    if (this.props.size == 'large') className += ' large';

    return (
      <div className={className}>
        <img src='/images/profiles/sj.png' />
      </div>
    );
  },
});