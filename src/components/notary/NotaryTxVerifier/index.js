/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');
var Input = require('../../controls/Input');

var Bitnation = require('../../../bitnation/bitnation.pangea');

var NotaryTxVerifier = React.createClass({
  mixins: [ bitnMixin ],
  getInitialState: function () {
    return {
      value: null,
      verified: null,
      verifying: false
    };
  },
  render: function() {
    var statusClassName = 'status';
    if (this.state.verified === true) statusClassName += ' valid';
    if (this.state.verified === false) statusClassName += ' invalid';

    var className = this.className();
    if (this.state.verifying) className += ' verifying';

    return (
      <form className={className}
        onSubmit={this.onSubmit}>
        <legend>Verify a notary transaction hash.</legend>

        <div className={statusClassName}>
          {this.state.verified === true && 'Valid'}
          {this.state.verified === false && 'Invalid'}
        </div>

        <Input value={this.state.value}
          onChange={this.onChange} />

        <button type='submit'>Verify</button>
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

module.exports = NotaryTxVerifier;