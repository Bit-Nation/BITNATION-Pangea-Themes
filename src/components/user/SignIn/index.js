/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('SignIn');
var bitnMixins = require('../../lib/bitnMixins');
var Input = require('../../controls/Input');
var Button = require('../../controls/Button');

var signInMessage = require('../../../messages/signIn');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    cursor: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  },
  render: function () {
    var cursor = this.props.cursor;
    return (
      <form className={nameHelper.className} onSubmit={this.onSubmit}>
        <Input type={'password'} placeholder="Secret Phrase" value={cursor.cursor('secret')}
          onChange={cursor.cursor('secret')} />

        <div>
          <Button style={{width: '100%', marginTop: '1rem'}} submit>Sign in</Button>
        </div>
      </form>
    );
  },
  onSubmit: function (event) {
    event.preventDefault();

    var secret = this.props.cursor.get('secret');

    this.props.cursor.set('secret', null);

    this.props.dispatch(signInMessage({
      secret: secret
    }));
  }
});