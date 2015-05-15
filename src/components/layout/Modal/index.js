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
  propTypes: {
    open: React.PropTypes.bool,
    onClose: React.PropTypes.func.isRequired
  },
  render: function () { return null; },
  renderLayer: function () {
    var sectionProps = _.omit(this.props, 'open', 'onClose');

    var className = nameHelper.join(
      nameHelper.className,
      this.props.className,
      nameHelper.state({ open: this.props.open }));

    return (
      <div className={className}>
        <div className={nameHelper.ref('background')} onClick={this.close} />

        <Section {...sectionProps} />
      </div>
    );
  },
  close: function () {
    this.props.onClose();
  }
});