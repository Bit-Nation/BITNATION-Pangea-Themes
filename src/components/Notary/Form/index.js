/** @jsx React.DOM */
require('./style.scss');
var React = require('react');

var $ = require('jquery');
var Bitnation = require('../../../bitnation/bitnation.core');

var Form = React.createClass({

  render: function() {
    return (
      <div className="notary-form">
        <h1>Document Notary</h1>
        <form id="hasher-form" method="POST" role="form">
          <legend>Notarise a file</legend>

          <input type="file" id="hasher" onChange={this.notarizeDocument} />

        </form>
      </div>
    );
  },
  notarizeDocument: function (e) {
    var file = e.target.files[0];

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

module.exports = Form;