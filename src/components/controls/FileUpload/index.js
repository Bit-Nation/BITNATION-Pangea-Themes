/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');

var FileUpload = React.createClass({
  mixins: [ bitnMixin ],
  propTypes: {
    className: React.PropTypes.string,
    footer: React.PropTypes.any,
    control: React.PropTypes.string,
    multiple: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    onChange: React.PropTypes.func
  },
  render: function () {
    var className = this.className();
    if (this.props.className) className += ' ' + this.props.className;
    if (!this.props.control) className += ' hide-control';
    if (this.state.active) className += ' active';

    className += ' count-' + this.state.files.length;
    className += ' ' + (this.state.files.length == 0 ? 'empty' : 'filled');

    return (
      <div className={className}
        onClick={!this.props.control && this.onClick}
        onDragLeave={this.onDragLeave}
        onDragOver={this.onDragOver}
        onDrop={this.onChange}>

        <input type='file' ref='input'
          multiple={this.props.multiple}
          disabled={this.props.disabled}
          onChange={this.onChange} />

        {this.props.children &&
          <header>{this.props.children}</header>}

        {this.props.control &&
          <div className='control' onClick={this.onClick}>
            {this.props.control}
          </div>}

        {this.props.footer &&
          <footer>{this.props.footer}</footer>}
      </div>
    );
  },
  getInitialState: function() {
    return {
      active: false,
      files: []
    };
  },
  onClick: function () {
    this.refs.input.getDOMNode().click();
  },
  onDragLeave: function () {
    this.setState({ active: false });
  },
  onDragOver: function (event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';

    this.setState({ active: true });
  },
  onChange: function (event) {
    event.preventDefault();

    var files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    files = [].slice.call(files, 0);

    this.setState({
      active: false,
      files: files
    });

    if (!this.props.onChange) return;
    this.props.onChange(files);
  }
});

module.exports = FileUpload;