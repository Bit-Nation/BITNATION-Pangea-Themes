/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../nameHelper')('FileInput');
var wrapImmutables = require('../../wrapImmutables');
var bitnMixins = require('../../mixins/bitnMixins');

module.exports = wrapImmutables(React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    className: React.PropTypes.string,
    children: React.PropTypes.node,
    trigger: React.PropTypes.node,
    footer: React.PropTypes.node,
    multiple: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    onChange: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      dragOver: false
    };
  },
  render: function () {
    var className = nameHelper.join(
      nameHelper.className,
      this.props.className,
      nameHelper.state({
        disabled: this.props.disabled,
        dragOver: this.state.dragOver
      }));

    return (
      <div className={className}
        onClick={!this.props.trigger && this.onClick}
        onDragLeave={this.onDragLeave}
        onDragOver={this.onDragOver}
        onDrop={this.onChange}>

        <input type='file' ref='input'
          className={nameHelper.ref('input')}
          multiple={this.props.multiple}
          disabled={this.props.disabled}
          onChange={this.onChange} />

        {this.props.children &&
          <div className={nameHelper.ref('body')}>
            {this.props.children}
          </div>}

        {this.props.trigger &&
          <div className={nameHelper.ref('trigger')} onClick={this.onClick}>
            {this.props.trigger}
          </div>}

        {this.props.footer &&
          <footer className={nameHelper.ref('footer')}>
            {this.props.footer}
          </footer>}
      </div>
    );
  },
  onClick: function () {
    this.refs.input.getDOMNode().click();
  },
  onDragLeave: function () {
    this.setState({ dragOver: false });
  },
  onDragOver: function (event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    this.setState({ dragOver: true });
  },
  onChange: function (event) {
    event.preventDefault();

    var files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    files = [].slice.call(files, 0);
    if (this.props.onChange) this.props.onChange(files);

    this.setState({ dragOver: false });
  }
}));