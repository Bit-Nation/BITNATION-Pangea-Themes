/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');
var Section = require('../../layout/Section');

var ControlSection = React.createClass({
  mixins: [ bitnMixin ],
  render: function () {
    var className = this.classNameWithProp();
    var header = this.props.header;
    if (this.props.controls) {
      header = (
        <div className={this.refName('controls')}>
          {this.props.controls}
        </div>
      );
      className += ' ' + this.stateName('controls');
    }

    return <Section
      titleTag='h3'
      {...this.props}
      header={header}
      className={className} />;
  }
});

module.exports = ControlSection;