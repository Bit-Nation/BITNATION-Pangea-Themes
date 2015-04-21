/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var component = require('../../component');

var _ = require ('lodash');

module.exports = component('Table', {
  propTypes: {
    className: React.PropTypes.string,
    head: React.PropTypes.arrayOf(React.PropTypes.string),
    foot: React.PropTypes.arrayOf(React.PropTypes.string),
    body: React.PropTypes.arrayOf(React.PropTypes.array)
  },
  render: function () {
    var className = this.className();
    className += ' pure-table';
    if (this.props.striped) className += ' pure-table-striped';
    if (this.props.className) className += ' ' + this.props.className;

    return (
      <table className={className}>

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
});

function toColumn (content) {
  return <td>{content}</td>;
}

function toHeadColumn (content) {
  return <th>{content}</th>;
}

function toRow (columns) {
  return <tr>{columns.map(toColumn)}</tr>;
}