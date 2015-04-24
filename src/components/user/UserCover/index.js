/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');

var UserCover = React.createClass({
  mixins: [ bitnMixin ],
  render: function () {
    return (
      <div className={this.className()} style={{ height: this.props.height }}>
        <div>
          <span className={this.refName('date')}>
            march 31, 2015
          </span>
          <div className={this.refName('about')}>
            <h2>Welcome to your <b>Bitnation</b></h2>
            <span className={this.refName('text')}>
              Your humble servant in this wretched world
            </span>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = UserCover;