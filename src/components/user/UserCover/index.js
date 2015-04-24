/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');

var fecha = require('fecha');

var UserCover = React.createClass({
  mixins: [ bitnMixin ],
  render: function () {
    return (
      <div className={this.className()} style={{ height: this.props.height }}>
        <div>
          {this.props.date !== false &&
            <span className={this.refName('date')}>
              {fecha.format(this.props.date || new Date(), 'MMMM Do, YYYY')}
            </span>}

          <div className={this.refName('about')}>
            <h2>{this.props.children}</h2>

            {this.props.text &&
              <div className={this.refName('text')}>
                <span>
                  {this.props.text}
                </span>
              </div>}
          </div>
        </div>
      </div>
    );
  },
});

module.exports = UserCover;