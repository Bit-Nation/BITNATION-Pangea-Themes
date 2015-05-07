/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('Modal');
var bitnMixins = require('../../lib/bitnMixins');
var LayerMixin = require('react-layer-mixin');
var Section = require('../../layout/Section');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins.concat(LayerMixin),
  render: function () { return null; },
  renderLayer: function () {
    var className = nameHelper.join(
      nameHelper.className,
      this.props.className);

    return (
      <div className={className}>
        <Section {...this.props} />
      </div>
    );
  }
});