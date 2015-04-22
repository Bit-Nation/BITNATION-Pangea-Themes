/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');
var Input = require('../../controls/Input');
var FileUpload = require('../../controls/FileUpload');

var Bitnation = require('../../../bitnation/bitnation.pangea');

var NotaryUpload = React.createClass({
  mixins: [ bitnMixin ],
  propTypes: {
    public: React.PropTypes.bool,
    uri: React.PropTypes.string,
    secret: React.PropTypes.string
  },
  getInitialState: function () {
    return {
      public: false,
    }
  },
  render: function() {
    return (
      <FileUpload className={this.className()}
        control='Select file'
        footer='All filetypes allowed (Max filesize: 8MB)'
        onChange={this.onFile}>
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

            <Input value={this.state.uri} onChange={this.onUri} />
          </div>

          <div className='secret'>
            <legend>Your private key (required)</legend>

            <Input password value={this.state.secret} onChange={this.props.onSecret} />
          </div>
        </div>

        <h3>Drag & drop your documents</h3>
      </FileUpload>
    );
  },
  onPrivacy: function () {
    this.setState({ public: !this.state.public });
  },
  onUri: function (value) {
    this.setState({ uri: value });
  },
  onSecret: function (value) {
    this.setState({ secret: value });
  },
  onFile: function (files) {
    // this.setState({ file: files[0] });
    this.issueNotary(files[0]);
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
  }
});

module.exports = NotaryUpload;