/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var _ = require('lodash');
var nameHelper = require('../../lib/nameHelper')('ModalSection');
var bitnMixins = require('../../lib/bitnMixins');
var Icon = require('../../controls/Icon');
var Button = require('../../controls/Button');
var Section = require('../../layout/Section');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    onClose: React.PropTypes.func
  },
  render: function () {
    var className = nameHelper.join(
      nameHelper.className,
      this.props.className,
      nameHelper.state({ close: this.props.onClose }));

    var header = [];
    if (this.props.header) header.push(this.props.header);
    if (this.props.onClose) header.push(
      <Button subtle className={nameHelper.ref('close')}
        onClick={this.props.onClose}>
        &times;
      </Button>
    );

    var sectionProps = _.omit(this.props, 'onClose');

    return <Section
      {...sectionProps}
      className={className}
      header={header} />;
  }
});