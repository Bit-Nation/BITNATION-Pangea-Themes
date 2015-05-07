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
        <label>
          Username

          <Input value={cursor.cursor('username')}
            onChange={cursor.cursor('username')} />
        </label>

        <label>
          Password
  
          <Input password value={cursor.cursor('password')}
            onChange={cursor.cursor('password')} />
        </label>

        <Button submit>Sign in</Button>
      </form>
    );
  },
  onSubmit: function (event) {
    event.preventDefault();

    this.props.dispatch(signInMessage({
      username: this.props.cursor.get('username'),
      password: this.props.cursor.get('password')      
    }));
  }
});