/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../nameHelper')('Results');
var bitnMixins = require('../../mixins/bitnMixins');
var Section = require('../../layout/Section');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  render: function () {
    return <Section
      titleTag='h3'
      {...this.props}
      className={nameHelper.join(
        nameHelper.className,
        this.props.className
      )} />;
  }
});