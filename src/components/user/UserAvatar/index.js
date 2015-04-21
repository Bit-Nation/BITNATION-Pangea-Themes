/** @jsx React.DOM */
require('./style.scss');

var React = require('react/addons');
var classSet = React.addons.classSet;

var UserAvatar = React.createClass({
  render: function () {
    return (
      <div className={classSet({
        'bitn-user-avatar': true,
        'medium': this.props.size == 'medium',
        'large': this.props.size == 'large'
      })}>
        <img src='/images/profiles/sj.png' />
      </div>
    );
  },
});

module.exports = UserAvatar;