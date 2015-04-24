/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');
var Button = require('../../controls/Button');
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
        trigger={<Button file large auto>Select file</Button>}
        footer='All filetypes allowed (Max filesize: 8MB)'
        onChange={this.props.onFiles}>

        <div className={this.refName('fields')}>
          <div className={this.refName('public')}>
            <legend>Please select</legend>

            <label>
              Private release

              <Radio name={this.formId('public')}
                value={false} checked={!this.props.public}
                onChange={this.props.onPublic} />
            </label>

            <label>
              Public release

              <Radio name={this.formId('public')}
                value={true} checked={this.props.public}
                onChange={this.props.onPublic} />
            </label>
          </div>

          <div className={this.refName('uri')}>
            <legend>A URI at which to locate the file (optional)</legend>

            <Input value={this.props.uri}
              onChange={this.props.onUri} />
          </div>

          <div className={this.refName('secret')}>
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