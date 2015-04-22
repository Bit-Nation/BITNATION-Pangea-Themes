/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');

var UserAvatar = React.createClass({
  mixins: [ bitnMixin ],
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

module.exports = UserAvatar;