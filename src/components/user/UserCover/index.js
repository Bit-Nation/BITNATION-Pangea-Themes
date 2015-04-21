/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var component = require('../../component');

module.exports = component('UserCover', {
  render: function () {
    return (
      <div className={this.className()} style={{ height: this.props.height }}>
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