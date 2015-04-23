/** @jsx React.DOM */

var React = require('react');
var ControlSection = require('.');
var Icon = require('../../controls/Icon');
var Button = require('../../controls/Button');

module.exports = function (params) {
  return (
    <ControlSection flex={1}
      title={[
        'Encrypted stuff',
        <Icon type='lock' />
      ]}
      controls={[
        <Button autoHeight>What up</Button>,
        <Button autoHeight>What up</Button>
      ]}>
      Tiweer Feeecok Reeit
    </ControlSection>
  );
};