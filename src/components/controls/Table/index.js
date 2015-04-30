/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../nameHelper')('Table');
var wrapImmutables = require('../../wrapImmutables');
var bitnMixins = require('../../mixins/bitnMixins');

module.exports = wrapImmutables(React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    className: React.PropTypes.string,
    head: React.PropTypes.arrayOf(React.PropTypes.string),
    foot: React.PropTypes.arrayOf(React.PropTypes.string),
    body: React.PropTypes.arrayOf(React.PropTypes.array)
  },
  render: function () {
    return (
      <table className={nameHelper.join(
        nameHelper.className,
        this.props.className,
        'pure-table',
        this.props.striped && 'pure-table-striped'
      )}>

        {this.props.head &&
          <thead>
            <tr>{this.props.head.map(toHeadColumn)}</tr>
          </thead>}

        {this.props.foot &&
          <tfoot>
            <tr>{this.props.foot.map(toColumn)}</tr>
          </tfoot>}

        <tbody>
          {this.props.children}

          {this.props.body && 
            this.props.body.map(toRow)}
        </tbody>
      </table>
    );
  }
}));

function toColumn (content, index) {
  return <td key={index}>{content}</td>;
}

function toHeadColumn (content, index) {
  return <th key={index}>{content}</th>;
}

function toRow (columns, index) {
  return <tr key={index}>{columns.map(toColumn)}</tr>;
}