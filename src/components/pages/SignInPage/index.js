/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var Immutable = require('immutable');
var nameHelper = require('../../lib/nameHelper')('SignInPage');
var bitnMixins = require('../../lib/bitnMixins');
var Button = require('../../controls/Button');
var Modal = require('../../layout/Modal');
var PageRow = require('../../layout/PageRow');
var PageSection = require('../../layout/PageSection');
var SignIn = require('../../user/SignIn');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    cursor: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  },
  getInitialState: function () {
    return {
      signInClosed: false,
      signUpClosed: true
    };
  },
  render: function() {
    var cursor = this.props.cursor;
    var dispatch = this.props.dispatch;

    return (
      <div className={nameHelper.className}>
        <Modal title='Sign In'
          closed={this.state.signInClosed}
          onClose={this.toggleSignIn}>
          
          <SignIn
            cursor={cursor.cursor('signIn')}
            dispatch={dispatch} />
        </Modal>

        <Modal title='Sign Up'
          closed={this.state.signUpClosed}
          onClose={this.toggleSignUp}>
          
          Passphrase generation here mby?
        </Modal>

        <PageRow>
          <PageSection flex={1}>
            <Button onClick={this.toggleSignIn}>Sign in</Button>
            <Button onClick={this.toggleSignUp}>Sign up</Button>
          </PageSection>
        </PageRow>
      </div>
    );
  },
  toggleSignIn: function () {
    this.setState({ signInClosed: !this.state.signInClosed });
  },
  toggleSignUp: function () {
    this.setState({ signUpClosed: !this.state.signUpClosed });
  }
});