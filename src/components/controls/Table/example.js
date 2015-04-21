/** @jsx React.DOM */

var React = require('react');
var Table = require('.');

module.exports = function (params) {
  return <Table
    head={['test', 'fest', 'rest']}
    body={[
      ['yo', 33, <h3>lol</h3>],
      ['hah', 'yo', 'what']
    ]}
    foot={['feet', 'of', 'god']} />;
};