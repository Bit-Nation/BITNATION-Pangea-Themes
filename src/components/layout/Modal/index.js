/** @jsx React.DOM */
require('./style.scss');

var React = window.React = require('react');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var _ = require('lodash');
var nameHelper = require('../../lib/nameHelper')('Modal');
var bitnMixins = require('../../lib/bitnMixins');
var LayerMixin = require('react-layer-mixin');
var ModalSection = require('../../layout/ModalSection');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins.concat(LayerMixin),
  propTypes: {
    closed: React.PropTypes.bool,
    closeable: React.PropTypes.bool,
    onClose: React.PropTypes.func.isRequired
  },
  render: function () { return null; },
  renderLayer: function () {
    var sectionProps = _.omit(this.props, 'closed', 'onClose');
    if (this.props.closeable !== false)
      sectionProps.onClose = this.props.onClose;

    var className = nameHelper.join(
      nameHelper.className,
      this.props.className,
      nameHelper.state({ closed: this.props.closed }));

    return (
      <ReactCSSTransitionGroup
        component='div'
        className={className}
        transitionName={nameHelper.state('display')}
        transitionAppear={true}>
        
        {!this.props.closed && [
          <div key='background'
            className={nameHelper.ref('background')}
            onClick={this.props.closeable !== false && this.close} />,

          <ModalSection key='section' {...sectionProps} />]}
      </ReactCSSTransitionGroup>
    );
  },
  close: function () {
    this.props.onClose();
  }
});