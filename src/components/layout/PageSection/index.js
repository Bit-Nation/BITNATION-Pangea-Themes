/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');
var Section = require('../../layout/Section');

var PageSection = React.createClass({
  mixins: [ bitnMixin ],
  render: function () {
    return <Section
      {...this.props}
      className={this.classNameWithProp()} />;
  }
});

module.exports = PageSection;