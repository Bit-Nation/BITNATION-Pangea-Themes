/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('NotaryTxVerifier');
var bitnMixins = require('../../lib/bitnMixins');
var Button = require('../../controls/Button');
var Input = require('../../controls/Input');

var Bitnation = require('../../../bitnation/bitnation.pangea');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  getInitialState: function () {
    return {
      value: null,
      verified: null,
      verifying: false
    };
  },
  render: function() {
    var className = nameHelper.join(
      nameHelper.className,
      nameHelper.state({
        verifying: this.state.verifying,
        valid: this.state.verified === true,
        invalid: this.state.verified === false
      }));

    return (
      <form className={className}
        onSubmit={this.onSubmit}>
        <legend>Verify a notary transaction hash.</legend>

        <div className={nameHelper.ref('status')}>
          {this.state.verified === true && 'Valid'}
          {this.state.verified === false && 'Invalid'}
        </div>

        <Input value={this.state.value}
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
  },
  onError: function (error) {
    if (!this.state.verifying) return;
    alert(error);
    this.setState({ verifying: false });
  },
  verify: function () {
    var ui = new Bitnation.pangea.UI();
    ui.verifyNotary(this.state.value)
      .done(this.onSuccess)
      .fail(this.onError);
    this.setState({ verifying: true });
  }
});