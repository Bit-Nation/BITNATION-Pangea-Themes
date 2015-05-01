/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('FileInfo');
var wrapImmutables = require('../../lib/wrapImmutables');
var bitnMixins = require('../../lib/bitnMixins');

var filesize = require('filesize');

module.exports = wrapImmutables(React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    className: React.PropTypes.string,
    name: React.PropTypes.string,
    type: React.PropTypes.string,
    size: React.PropTypes.number,
    sizeOptions: React.PropTypes.object,
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

    var className = nameHelper.join(
      nameHelper.className,
      this.props.className,
      typeClassName,
      nameHelper.state({
        name: this.props.name,
        type: this.props.type,
        size: this.props.size,
        lastModified: lastModified,
        relativePath: this.props.relativePath
      }));

    return (
      <div className={className}>
        {this.props.name &&
          <span className={nameHelper.ref('name')}>
            {this.props.name}
          </span>}

        {this.props.type &&
          <span className={nameHelper.ref('type')}>
            {this.props.type}
          </span>}

        {humanSize && [
          <span className={nameHelper.ref('humanSize')}>
            {humanSize}
          </span>,

          <span className={nameHelper.ref('size')}>
            {this.props.size}
          </span>]}

        {lastModified &&
          <span className={nameHelper.ref('lastModified')}>
            {lastModified}
          </span>}

        {this.props.relativePath &&
          <span className={nameHelper.ref('relativePath')}>
            {this.props.relativePath}
          </span>}

        {this.props.children}
      </div>
    );
  }
}));