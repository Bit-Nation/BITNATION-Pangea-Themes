/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var component = require('../../component');

var TextInput = require('../../controls/TextInput');
var FileUpload = require('../../controls/FileUpload');

var Bitnation = require('../../../bitnation/bitnation.core');

module.exports = component('NotaryUpload', {
  getInitialState: function () {
    return {
      public: false,
    }
  },
  render: function() {
    return (
      <div className={this.className()}>
        <div className='fields'>
          <div className='privacy'>
            <legend>Please select</legend>

            <label>
              Private release
              <input type='radio' name='privacy' checked={!this.state.public}
                onChange={this.onPrivacy}  />
            </label>

            <label>
              Public release
              <input type='radio' name='privacy' checked={this.state.public}
               onChange={this.onPrivacy} />
            </label>
          </div>

          <div className='signature'>
            <legend>Sign in with private key (optional)</legend>
            <TextInput value={this.state.signature} onChange={this.onSignature} />
          </div>
        </div>

        <FileUpload onChange={this.onFile}>
          Upload file
        </FileUpload>
      </div>
    );
  },
  onPrivacy: function () {
    this.setState({ public: !this.state.public });
  },
  onSignature: function (value) {
    this.setState({ signature: value });
  },
  onFile: function (files) {
    this.setState({ file: files[0] });
    this.submit();
  },
  submit: function () {
    /*
      this.state.file,
      this.state.public,
      this.state.signature

      do your magic
    */

    var fileHasher = new Bitnation.encryption.FileHasher(this.state.file);

    fileHasher.getHash()
      .done(function (hash) {
        alert(hash);
      })
      .fail(function (err) {
        console.error(err);
      });
  }
});