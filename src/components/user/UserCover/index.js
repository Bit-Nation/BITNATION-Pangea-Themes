/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('UserCover');
var bitnMixins = require('../../lib/bitnMixins');

var fecha = require('fecha');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  render: function () {
    return (
      <div className={nameHelper.className}
        style={{ height: this.props.height }}>

        <div>
          {this.props.date !== false &&
            <span className={nameHelper.ref('date')}>
              {fecha.format(this.props.date || new Date(), 'MMMM Do, YYYY')}
            </span>}

          <div className={nameHelper.ref('about')}>
            <h2>{this.props.title}</h2>

            {this.props.text &&
              <div className={nameHelper.ref('text')}>
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