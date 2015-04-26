/** @jsx React.DOM */
require('./style.scss');

var React = require('react');

var bitnMixin = require('../../mixins/bitnMixin');
var Button = require('../../controls/Button');
var Input = require('../../controls/Input');
var Textarea = require('../../controls/Textarea');
var Radio = require('../../controls/Radio');
var FileInput = require('../../controls/FileInput');

var Bitnation = require('../../../bitnation/bitnation.pangea');

var SendMessageForm = React.createClass({
  mixins: [ bitnMixin ],
  propTypes: {
    encrypted: React.PropTypes.bool,
    recipient: React.PropTypes.string,
    content: React.PropTypes.string,
    secret: React.PropTypes.string
  },
  render: function () {
    return (
      <div className={this.className()}>

        <h1>Send a Message</h1>

        <div className={this.refName('fields')}>
          <div className={this.refName('encrypted')}>
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

          <div className={this.refName('recipientPubkey')}>
            <legend>Recipient public key (usually optional)</legend>

            <Input value={this.props.recipientPubkey}
              onChange={this.props.onRecipientPubkey} />
          </div>

          <div className={this.refName('recipientRS')}>
            <legend>Recipient</legend>

            <Input value={this.props.recipientRS}
              onChange={this.props.onRecipientRS} />
          </div>

          <div className={this.refName('content')}>
            <legend>Content</legend>

            <Textarea value={this.props.content}
              onChange={this.props.onContent} />
          </div>

          <div className={this.refName('secret')}>
            <legend>Secret phrase</legend>

            <Input password value={this.props.secret}
              onChange={this.props.onSecret} />
          </div>
          <div className={this.refName('submit')}>
            <Button onClick={this.props.onSend}>Send message</Button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SendMessageForm;