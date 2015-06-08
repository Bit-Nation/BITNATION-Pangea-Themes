/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('EditCurrencyListForm');
var bitnMixins = require('../../lib/bitnMixins');
var Button = require('../../controls/Button');
var Input = require('../../controls/Input');
var Textarea = require('../../controls/Textarea');
var Radio = require('../../controls/Radio');
var FileInput = require('../../controls/FileInput');

var Bitnation = require('../../../bitnation/bitnation.pangea');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    currency: React.PropTypes.string,
    dividendRate: React.PropTypes.string,
    network: React.PropTypes.string,
    secret: React.PropTypes.string
  },
  render: function () {
    return (
      <div className={nameHelper.className}>
     

        <div className={nameHelper.ref('currency')}>
          <legend>{this.props.currency}</legend>

        </div>

        <div className={nameHelper.ref('dividendRate')}>
          <legend></legend>

          <Input placeholder={this.props.dividendRate}
            onChange={this.props.onDividendRate} />
        </div>

        <div className={nameHelper.ref('network')}>
          <legend>{this.props.network}</legend>

        </div>

        <div className={nameHelper.ref('submit')}>
          <Button onClick={this.props.onUpdate}>Update</Button>
        </div>
     </div>
    );
  }
});