/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var component = require('../../component');

var filesize = require('filesize');

module.exports = component('FileInfo', {
  propTypes: {
    className: React.PropTypes.string,
    name: React.PropTypes.string,
    size: React.PropTypes.number,
    sizeOptions: React.PropTypes.object,
    type: React.PropTypes.string,
    lastModified: React.PropTypes.number,
    lastModifiedDate: React.PropTypes.instanceOf(Date),
    relativePath: React.PropTypes.string
  },
  render: function () {
    var typeClassName;
    if (this.props.type)
      typeClassName = this.props.type.replace(/\//g, '__');

    var humanSize;
    if (this.props.size != null)
      humanSize = filesize(this.props.size, this.props.sizeOptions);

    var lastModified = this.props.lastModifiedDate || this.props.lastModified;
    if (typeof lastModified == 'number') date = new Date(lastModified);

    // set class
    var className = this.className();
    if (this.props.className) className += ' ' + this.props.className;
    if (typeClassName) className += ' ' + typeClassName;

    if (this.props.name) className += ' has-name';
    if (this.props.size) className += ' has-size';
    if (this.props.type) className += ' has-type';
    if (lastModified) className += ' has-last-modified';
    if (this.props.relativePath) className += ' has-relative-path';

    return (
      <div className={className}>
        {this.props.name &&
          <span className='name'>{this.props.name}</span>}

        {humanSize && [
          <span className='human-size'>{humanSize}</span>,
          <span className='size'>{this.props.size}</span>]}

        {this.props.type &&
          <span className='type'>{this.props.type}</span>}

        {lastModified &&
          <span className='last-modified'>{lastModified}</span>}

        {this.props.relativePath &&
          <span className='relative-path'>{this.props.relativePath}</span>}

        {this.props.children}
      </div>
    );
  }
});