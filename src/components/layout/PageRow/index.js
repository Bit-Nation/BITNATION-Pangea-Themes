/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');

var PageRow = React.createClass({
  mixins: [ bitnMixin ],
  propTypes: {
    className: React.PropTypes.string
  },
  render: function () {
    return (
      <div className={this.className()}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = PageRow;