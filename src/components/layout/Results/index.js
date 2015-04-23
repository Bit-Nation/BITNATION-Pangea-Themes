/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');
var Section = require('../../layout/Section');

var Results = React.createClass({
  mixins: [ bitnMixin ],
  render: function () {
    return <Section
      titleTag='h3'
      {...this.props}
      className={this.classNameWithProp()} />;
  }
});

module.exports = Results;