/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');

var PageHeader = React.createClass({
  mixins: [ bitnMixin ],
  propTypes: {
    className: React.PropTypes.string
  },
  render: function () {
    return (
      <header className={this.classNameWithProp()}>
        {this.props.title &&
          <h1>{this.props.title}</h1>}

        {this.props.children}
      </header>
    );
  }
});

module.exports = PageHeader;