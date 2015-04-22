/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');

var Paginator = React.createClass({
  mixins: [ bitnMixin ],
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
        <li key={i}
          className={'page-' + i + ' pure-menu-item'}>
          <button type='button' className={this.buttonClassName(i)}
            onClick={this.onPage}
            disabled={this.props.page == i}
            value={i}>
            {i+1}
          </button>
        </li>
      );
    }

    var className = this.className();
    className += ' pure-menu';
    className += ' pure-menu-horizontal';
    className += ' length-' + pages.length;

    return (
      <ul className={className}>
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
});