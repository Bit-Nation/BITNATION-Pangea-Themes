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
    encrypted: React.PropTypes.bool,
    recipient: React.PropTypes.string,
    content: React.PropTypes.string,
    secret: React.PropTypes.string
  },
  render: function () {
    return (
      <div className={nameHelper.className}>
        <div className={nameHelper.ref('encrypted')}>
          <legend>Please select</legend>

          <label>
            Encrypted

            <Radio name={this.formId('sendMessage')}
              value={true} checked={this.props.encrypted}
              onChange={this.props.onEncrypted} />
          </label>

          <label>
            Plain text

            <Radio name={this.formId('sendMessage')}
              value={false} checked={!this.props.encrypted}
              onChange={this.props.onEncrypted} />
          </label>
        </div>

        <div className={nameHelper.ref('recipientPubkey')}>
          <legend>Recipient public key (usually optional)</legend>

          <Input value={this.props.recipientPubkey}
            onChange={this.props.onRecipientPubkey} />
        </div>

        <div className={nameHelper.ref('recipientRS')}>
          <legend>Recipient</legend>

          <Input value={this.props.recipientRS}
            onChange={this.props.onRecipientRS} />
        </div>

        <div className={nameHelper.ref('content')}>
          <legend>Content</legend>

          <Textarea value={this.props.content}
            onChange={this.props.onContent} />
        </div>

        <div className={nameHelper.ref('secret')}>
          <legend>Secret phrase</legend>

          <Input password value={this.props.secret}
            onChange={this.props.onSecret} />
        </div>

        <div className={nameHelper.ref('submit')}>
          <Button onClick={this.props.onSend}>Send message</Button>
        </div>
     </div>
    );
  }
});