/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('NotaryTxVerifier');
var bitnMixins = require('../../lib/bitnMixins');
var Button = require('../../controls/Button');
var Input = require('../../controls/Input');

var verifyTxMessage = require('../../../messages/notary/verifyTx');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    cursor: React.PropTypes.object.isRequired,
    verified: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  },
  render: function() {
    var cursor = this.props.cursor;
    var verified = this.props.verified;

    var verifying = false;
    var valid;
    if (cursor.get('submitted') &&
        cursor.get('submitted') === cursor.get('txId')) {
      var result = verified.get(cursor.get('submitted'));
      if (!result) verifying = true;
      else valid = result.get('valid');
    }

    var className = nameHelper.join(
      nameHelper.className,
      nameHelper.state({
        verifying: verifying,
        valid: valid === true,
        invalid: valid === false
      }));

    return (
      <form className={className} onSubmit={this.onSubmit}>
        <legend>Verify a notary transaction hash.</legend>

        <div className={nameHelper.ref('status')}>
          {valid === true && 'Valid'}
          {valid === false && 'Invalid'}
        </div>

        <label htmlFor={this.formId('secret')}>
          Secret Phrase (if private):
        </label>

        <Input id={this.formId('txId')}
          value={cursor.cursor('secret')}
          onChange={cursor.cursor('secret')} />

        <label htmlFor={this.formId('txId')}>
          Transaction ID:
        </label>

        <Input id={this.formId('txId')}
          value={cursor.cursor('txId')}
          onChange={cursor.cursor('txId')} />

        <Button submit>Verify</Button>
      </form>
    );
  },
  onSubmit: function (event) {
    event.preventDefault();
    var cursor = this.props.cursor;
    cursor.set('submitted', cursor.get('txId'));
    this.props.dispatch(verifyTxMessage({
      txId: cursor.get('txId'),
      secret: cursor.get('secret')
    }));
  }
});
