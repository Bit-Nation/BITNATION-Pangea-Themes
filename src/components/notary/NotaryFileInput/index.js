/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');
var Input = require('../../controls/Input');
var Radio = require('../../controls/Radio');
var FileInput = require('../../controls/FileInput');

var Bitnation = require('../../../bitnation/bitnation.pangea');

var NotaryFileInput = React.createClass({
  mixins: [ bitnMixin ],
  propTypes: {
    public: React.PropTypes.bool,
    uri: React.PropTypes.string,
    secret: React.PropTypes.string
  },
  render: function () {
    return (
      <FileInput className={this.className()}
        control='Select file'
        footer='All filetypes allowed (Max filesize: 8MB)'
        onChange={this.props.onFiles}>

        <div className='fields'>
          <div className='public'>
            <legend>Please select</legend>

            <label className='off'>
              Private release

              <Radio name={this.formId('public')}
                value={false} checked={!this.props.public}
                onChange={this.props.onPublic} />
            </label>

            <label className='on'>
              Public release

              <Radio name={this.formId('public')}
                value={true} checked={this.props.public}
                onChange={this.props.onPublic} />
            </label>
          </div>

          <div className='uri'>
            <legend>A URI at which to locate the file (optional)</legend>

            <Input value={this.props.uri}
              onChange={this.props.onUri} />
          </div>

          <div className='secret'>
            <legend>Your private key (required)</legend>

            <Input password value={this.props.secret}
              onChange={this.props.onSecret} />
          </div>
        </div>

        <h3>Drag & drop your documents in the box</h3>
      </FileInput>
    );
  }
});

module.exports = NotaryFileInput;