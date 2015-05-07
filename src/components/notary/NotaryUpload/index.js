/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('NotaryUpload');
var bitnMixins = require('../../lib/bitnMixins');
var Button = require('../../controls/Button');
var Input = require('../../controls/Input');
var Radio = require('../../controls/Radio');
var FileInput = require('../../controls/FileInput');
var NotaryUploadSettings = require('../../notary/NotaryUploadSettings');

var uploadMessage = require('../../../messages/notary/upload');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    children: React.PropTypes.node,
    cursor: React.PropTypes.object.isRequired,
    notary: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  },
  render: function () {
    var cursor = this.props.cursor;
    var status;
    var className = nameHelper.className;

    return (
      <FileInput className={className}
        trigger={<Button file large>Select file</Button>}
        footer='All filetypes allowed (Max filesize: 8MB)'
        onChange={cursor.cursor('file')}>

        <NotaryUploadSettings cursor={cursor}>
          {this.props.children}
        </NotaryUploadSettings>

        <h3>Drag & drop your documents in the box</h3>

        {status}
      </FileInput>
    );
  },
  onChange: function (files) {
    var cursor = this.props.cursor;
    cursor = cursor.set('file', files[0]);
    var options = {
      file: cursor.get('file'),
      public: cursor.get('public'),
      uri: cursor.get('uri'),
      secret: cursor.get('secret')
    };
    this.props.dispatch(uploadMessage(options));
  }
});