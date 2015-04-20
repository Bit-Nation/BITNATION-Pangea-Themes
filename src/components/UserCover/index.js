/** @jsx React.DOM */
require('./style.scss');

var React = require('react/addons');
var classSet = React.addons.classSet;

var UserCover = React.createClass({
  render: function () {
    return (
      <div className='bitn-user-cover'>
        <div>
          <span className='date'>
            march 31, 2015
          </span>
          <div className='about'>
            <h2>Welcome to your <b>Bitnation</b></h2>
            <span className='text'>{'The world\'s first doge centered form of governance. Heil Shiba!'}</span>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = UserCover;