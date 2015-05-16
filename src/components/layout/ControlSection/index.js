/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var _ = require('lodash');
var nameHelper = require('../../lib/nameHelper')('ControlSection');
var bitnMixins = require('../../lib/bitnMixins');
var Section = require('../../layout/Section');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  render: function () {
    var className = nameHelper.join(
      nameHelper.className,
      this.props.className,
      nameHelper.state({ controls: this.props.controls })
    );
    
    var header = this.props.controls ? (
      <div className={nameHelper.ref('controls')}>
        {this.props.controls}
      </div>
    ) : this.props.header;

    var sectionProps = _.omit(this.props, 'controls');

    return <Section
      titleTag='h3'
      {...sectionProps}
      className={className}
      header={header} />;
  }
});