/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../nameHelper')('Button');
var wrapImmutables = require('../../wrapImmutables');
var bitnMixins = require('../../mixins/bitnMixins');

var _ = require('lodash');

var propTypes = {
  className: React.PropTypes.string,
  type: React.PropTypes.string,
  submit: React.PropTypes.bool
};

// states are binary attributes that can sometimes be combined
var states = [
  'file',
  'small', 'large',
  'auto', 'autoWidth', 'autoHeight'
];

for (var i in states) propTypes[states[i]] = React.PropTypes.bool;

module.exports = wrapImmutables(React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: propTypes,
  render: function () {
    var type = 'button';
    if (this.props.type) type = this.props.type;
    if (this.props.submit) type = 'submit';

    var className = nameHelper.join(
      nameHelper.className,
      this.props.className,
      'pure-button');

    // add state classes
    for (var i in states) {
      if (this.props[states[i]])
        className += ' ' + nameHelper.state(states[i]);      
    }

    return (
      <button {...this.props}
        type={type}
        className={className}>

        {this.props.children}
      </button>
    );
  }
}));