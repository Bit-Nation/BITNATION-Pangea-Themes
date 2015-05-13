/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
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

    return <Section
      titleTag='h3'
      {...this.props}
      header={header}
      className={className} />;
  }
});