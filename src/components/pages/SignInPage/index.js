/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var Immutable = require('immutable');
var nameHelper = require('../../lib/nameHelper')('SignInPage');
var bitnMixins = require('../../lib/bitnMixins');
var Button = require('../../controls/Button');
var Input = require('../../controls/Input');
var Modal = require('../../layout/Modal');
var PageRow = require('../../layout/PageRow');
var PageSection = require('../../layout/PageSection');
var SignIn = require('../../user/SignIn');

var Bitnation = require('../../../bitnation/bitnation.core');
require('../../../bitnation/bitnation.pangea');

var ui = new Bitnation.pangea.UI();

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    cursor: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  },
  getInitialState: function () {
    return {
      signUpClosed: true,
      securityNoticeClosed: false,
      newAccountSecret: null
    };
  },
  render: function() {
    var cursor = this.props.cursor;
    var dispatch = this.props.dispatch;

    return (
      <div className={nameHelper.className}>
        <Modal title='Sign In'>
          <SignIn
            cursor={cursor.cursor('signIn')}
            dispatch={dispatch} />
          <div>
            <Button style={{width: '100%', marginTop: '1rem'}} onClick={this.onSignup}>Sign Up</Button>
          </div>
        </Modal>
        <Modal title='New Account'
          closed={this.state.signUpClosed}>
          <p>This is your new secret phrase. Make sure you have saved it securely before closing this window as a new one will be generated each time you click the Sign Up button.</p>
          <Input ref="newSecret" style={{width: '100%'}} value={this.state.newAccountSecret} onClick={this.selectSecret} />
          <Button style={{width: '100%', marginTop: '1rem'}} onClick={this.closeSignup}>Close</Button>
        </Modal>
        <Modal title='Important Security Information'
          closed={this.state.securityNoticeClosed}>
          <p style={{ fontSize: '150%', textAlign: 'center' }}>You should <b>under no circumstances use your existing Horizon mainnet passphrase on the Bitnation Alpha</b> client, as it will compromise your account’s security.</p>
          <p style={{ fontSize: '150%', textAlign: 'center' }}><b>Repeat: Do NOT use your existing Horizon mainnet secret phrase on the Bitnation Alpha release.</b></p>
          <Button style={{width: '100%', marginTop: '1rem'}} onClick={this.closeSecurityNotice}>I have read this and agree to all terms</Button>
        </Modal>
      </div>
    );
  },
  selectSecret: function () {
    React.findDOMNode(this.refs.newSecret).select();
  },
  openSignup: function (account) {
    this.setState({
      newAccountSecret: account.secretPhrase
    });
    this.setState({
      signUpClosed: false
    });
  },
  closeSignup: function () {
    this.setState({
      signUpClosed: true
    });
  },
  onSignup: function () {
    ui.createHzAccount()
    .done(this.openSignup)
    .fail(function (err) {
      console.error(err);
      alert('Could not create an account for some reason. Check the logs.');
    });
  },
  closeSignup: function () {
    this.setState({
      signUpClosed: true
    });
  },
  closeSecurityNotice: function () {
    this.setState({
      securityNoticeClosed: true
    });
  }
});