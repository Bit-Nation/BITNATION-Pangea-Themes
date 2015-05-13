/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('UserAvatar');
var bitnMixins = require('../../lib/bitnMixins');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  render: function () {
    return (
      <div className={nameHelper.join(
        nameHelper.className,
        nameHelper.state({
          medium: this.props.size == 'medium',
          large: this.props.size == 'large'
      }))}>
        <img src='/images/profiles/sj.png' />
      </div>
    );
  },
});