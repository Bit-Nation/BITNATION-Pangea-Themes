/** @jsx React.DOM */
require('./style.scss');
var React = require('react');

var Bitnation = require('../../../bitnation/bitnation.core');

var NotaryForm = React.createClass({
  render: function() {
    return (
      <div className='bitn-notary-form'>
        <h1>Document Notary</h1>
        <form method='post' role='form'>
          <legend>Notarize a file</legend>
          <input type='file' onChange={this.onChange} />
        </form>
      </div>
    );
  },
  onChange: function (event) {
    var file = event.target.files[0];
    this.notarize(file);
  },
  notarize: function (file) {
    var fileHasher = new Bitnation.encryption.FileHasher(file);

    fileHasher.getHash()
    .done(function (hash) {
      alert(hash);
    })
    .fail(function (err) {
      console.error(err);
    });
  }
});

module.exports = NotaryForm;