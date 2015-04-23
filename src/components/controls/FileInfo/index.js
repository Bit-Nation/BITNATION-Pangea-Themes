/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');

var filesize = require('filesize');

var FileInfo = React.createClass({
  mixins: [ bitnMixin ],
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

    // set class
    var className = this.className();
    if (this.props.className) className += ' ' + this.props.className;
    if (typeClassName) className += ' ' + typeClassName;

    if (this.props.name) className += ' ' + this.stateName('hasName');
    if (this.props.type) className += ' ' + this.stateName('hasType');
    if (this.props.size) className += ' ' + this.stateName('hasSize');
    if (lastModified) className += ' ' + this.stateName('hasLastModified');
    if (this.props.relativePath) className += ' ' + this.stateName('hasRelativePath');

    return (
      <div className={className}>
        {this.props.name &&
          <span className={this.refName('name')}>
            {this.props.name}
          </span>}

        {this.props.type &&
          <span className={this.refName('type')}>
            {this.props.type}
          </span>}

        {humanSize && [
          <span className={this.refName('humanSize')}>
            {humanSize}
          </span>,

          <span className={this.refName('size')}>
            {this.props.size}
          </span>]}

        {lastModified &&
          <span className={this.refName('lastModified')}>
            {lastModified}
          </span>}

        {this.props.relativePath &&
          <span className={this.refName('relativePath')}>
            {this.props.relativePath}
          </span>}

        {this.props.children}
      </div>
    );
  }
});

module.exports = FileInfo;