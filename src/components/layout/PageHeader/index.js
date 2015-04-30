/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../nameHelper')('PageHeader');
var bitnMixins = require('../../mixins/bitnMixins');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    className: React.PropTypes.string
  },
  render: function () {
    return (
      <header className={nameHelper.join(
        nameHelper.className,
        this.props.className
      )}>
        {this.props.title &&
          <h1>{this.props.title}</h1>}

        {this.props.children}
      </header>
    );
  }
});