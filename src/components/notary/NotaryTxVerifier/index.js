/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');
var Button = require('../../controls/Button');
var Input = require('../../controls/Input');

var Bitnation = require('../../../bitnation/bitnation.pangea');

var NotaryTxVerifier = React.createClass({
  mixins: [ bitnMixin ],
  getInitialState: function () {
    return {
      value: null,
      secret: null,
      verified: null,
      verifying: false
    };
  },
  render: function() {
    var className = this.className();
    if (this.state.verifying) className += ' ' + this.stateName('verifying');
    if (this.state.verified === true) className += ' ' + this.stateName('valid');
    if (this.state.verified === false) className += ' ' + this.stateName('invalid');

    return (
      <form className={className}
        onSubmit={this.onSubmit}>
        <legend>Verify a notary transaction hash.</legend>

        <div className={this.refName('status')}>
          {this.state.verified === true && 'Valid'}
          {this.state.verified === false && 'Invalid'}
        </div>

        <label htmlFor="secret">Secret Phrase (if private):</label>
        <Input type="password" name="secret" value={this.state.secret}
          onChange={this.onSecretChange} />

        <label htmlFor="txid">Transaction ID:</label>
        <Input name="txid" value={this.state.value}
          onChange={this.onChange} />

        <Button submit>Verify</Button>
      </form>
    );
  },
  onChange: function (value) {

    this.setState({
      value: value,
      verified: null,
      verifying: false
    });

  },
  onSecretChange: function (secret) {

    this.setState({
      secret: secret,
      verifying: false,
      verified: null
    });

  },
  onSubmit: function (event) {

    event.preventDefault();

    this.verify();

  },
  onSuccess: function (result) {

    if (!this.state.verifying) return;

    this.setState({
      verified: result,
      verifying: false
    });

    var hash = result.verifiedNotary.notary.hash;
    var owner = result.owner;

    alert('Notary by ' + owner + ' has hash ' + hash);

  },
  onError: function (error) {
    if (!this.state.verifying) return;
    this.setState({ verifying: false });

    console.error(error);
    alert('Failure with error "' + error.errorDescription + '"');
  },
  verify: function () {

    var ui = new Bitnation.pangea.UI();

    ui.verifyNotary(this.state.value, this.state.secret)
      .done(this.onSuccess)
      .fail(this.onError);

    this.setState({
      verifying: true,
      secret: null
    });

  }
});

module.exports = NotaryTxVerifier;