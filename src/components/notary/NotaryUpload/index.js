/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var component = require('../../component');

var FileUpload = require('../../controls/FileUpload');

var Bitnation = require('../../../bitnation/bitnation.pangea');

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

          <div className='uri'>
            <legend>A URI at which to locate the file (optional)</legend>

            <input type='text' value={this.state.uri}
              onChange={this.onUri} />
          </div>

          <div className='secret'>
            <legend>Your private key (required)</legend>

            <input type='password' value={this.state.secret}
              onChange={this.onSecretPhrase} />
          </div>
        </div>

        <FileUpload onChange={this.onFile}>
          Upload file
        </FileUpload>

        <div className='fields'>

          <div className='verifyNotary'>
            <legend>Verify a notary transaction hash.</legend>

            <input type='text' value={this.state.notaryTxId}
              onChange={this.onVerifyNotary} />

            <button type='button' onClick={this.verifyNotary}>Verify</button>
          </div>

        </div>
      </div>
    );
  },
  onPrivacy: function () {
    this.setState({ public: !this.state.public });
  },
  onSecretPhrase: function (event) {
    this.setState({ secret: event.target.value });
  },
  onVerifyNotary: function (event) {
    this.setState({ notaryTxId: event.target.value });
  },
  onFile: function (files) {
    // this.setState({ file: files[0] });
    this.issueNotary(files[0]);
  },
  onUri: function (event) {
    this.setState({ uri: event.target.value });
  },
  issueNotary: function (file) {

    // @todo: Encrypted (private) notaries

    var ui = new Bitnation.pangea.UI();

    ui.notarizeDocument(file, this.state.secret, this.state.uri)
      .done(function (result) {

        console.log(result);
        alert('Success: Transaction id is ' + result.txId);

      })
      .fail(function (err) {

        alert('An error occurred. Check the logs.');
        console.error(err);

      });

    this.setState({ secret: '' });

  },
  verifyNotary: function () {
    
    var ui = new Bitnation.pangea.UI();

    ui.verifyNotary(this.state.notaryTxId)
      .done(function (result) {

        alert('Success. The notary hash is: ' + result.notary.hash);
        console.log(result);

      })
      .fail(function (err) {

        alert('An error occurred. Check the logs.');
        console.error(err);

      });

  }
});