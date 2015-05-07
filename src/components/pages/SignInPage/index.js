/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('SignInPage');
var bitnMixins = require('../../lib/bitnMixins');
var Modal = require('../../layout/Modal');
var SignIn = require('../../user/SignIn');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    cursor: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  },
  render: function() {
    var cursor = this.props.cursor;
    var dispatch = this.props.dispatch;

    return (
      <div className={nameHelper.className}>
        <Modal>
          <SignIn cursor={cursor.cursor('form')} dispatch={dispatch} />
        </Modal>
      </div>
    );
  }
});