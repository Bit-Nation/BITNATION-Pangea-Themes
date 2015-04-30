/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../nameHelper')('Paginator');
var wrapImmutables = require('../../wrapImmutables');
var bitnMixins = require('../../mixins/bitnMixins');

module.exports = wrapImmutables(React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    page: React.PropTypes.number,
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    size: React.PropTypes.number,
    onChange: React.PropTypes.func
  },
  getDefaultProps: function () {
    return {
      page: 0,
      min: 0,
      max: Infinity,
      size: 5
    };
  },
  render: function () {
    var pages;
    if (this.props.size) {
      var start = Math.max(
        this.props.page - Math.floor(this.props.size / 2),
        this.props.min
      );
      var end = Math.min(
        start + this.props.size - 1,
        this.props.max
      );
      if (end - start < this.props.size) {
        start = Math.max(
          end - this.props.size + 1,
          this.props.min
        );
      }

      pages = [];
      for (var i = start; i <= end; i++) pages.push(
        <li key={i} className={nameHelper.join(
          nameHelper.ref('page-' + i),
          'pure-menu-item'
        )}>
          <button type='button' className={this.buttonClassName(i)}
            onClick={this.onPage}
            disabled={this.props.page == i}
            value={i}>
            {i+1}
          </button>
        </li>
      );
    }

    return (
      <ul className={nameHelper.join(
        nameHelper.className,
        this.props.className,
        'pure-menu',
        'pure-menu-horizontal'
      )}>
        <li className='previous pure-menu-item'>
          <button type='button' className='pure-button'
            onClick={this.onPrevious}
            disabled={this.props.page <= this.props.min}>
            &larr;
          </button>
        </li>
        {pages}
        <li className='next pure-menu-item'>
          <button type='button' className='pure-button'
            onClick={this.onNext}
            disabled={this.props.page >= this.props.max}>
            &rarr;
          </button>
        </li>
      </ul>
    );
  },
  onPrevious: function () {
    if (!this.props.onChange) return;
    this.props.onChange(this.props.page - 1);
  },
  onNext: function () {
    if (!this.props.onChange) return;
    this.props.onChange(this.props.page + 1);
  },
  onPage: function (event) {
    if (!this.props.onChange) return;
    this.props.onChange(parseInt(event.target.value));
  },
  buttonClassName: function (page) {
    var className = 'pure-button';
    if (page == this.props.page) className += ' pure-button-active';
    return className;
  }
}));