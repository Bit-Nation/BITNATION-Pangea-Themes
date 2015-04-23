/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');

var FileInput = React.createClass({
  mixins: [ bitnMixin ],
  propTypes: {
    className: React.PropTypes.string,
    trigger: React.PropTypes.string,
    footer: React.PropTypes.any,
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
    var className = this.className();
    if (this.props.className) className += ' ' + this.props.className;
    if (this.props.disabled) className += ' ' + this.stateName('disabled');
    if (this.state.dragOver) className += ' ' + this.stateName('dragOver');

    return (
      <div className={className}
        onClick={!this.props.trigger && this.onClick}
        onDragLeave={this.onDragLeave}
        onDragOver={this.onDragOver}
        onDrop={this.onChange}>

        <input type='file' {...this.classRef('input')}
          multiple={this.props.multiple}
          disabled={this.props.disabled}
          onChange={this.onChange} />

        {this.props.children &&
          <div className={this.refName('body')}>
            {this.props.children}
          </div>}

        {this.props.trigger &&
          <div className={this.refName('trigger')} onClick={this.onClick}>
            {this.props.trigger}
          </div>}

        {this.props.footer &&
          <footer className={this.refName('footer')}>
            {this.props.footer}
          </footer>}
      </div>
    );
  },
  onClick: function () {
    this.classRefs.input.getDOMNode().click();
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
});

module.exports = FileInput;