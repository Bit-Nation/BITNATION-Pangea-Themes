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

var notaryUploadMessage = require('../../../messages/notaryUpload');
var actions = require('./actions');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    children: React.PropTypes.node,
    cursor: React.PropTypes.object.isRequired,
    //notaryUploads: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  },
  render: function () {
    var cursor = this.props.cursor;
    var active = cursor.cursor('active');
    var status;
    var className = nameHelper.className;

    if (!active.isEmpty()) {
      if (active.get('error')) {
        status = 'Error!';
        className += ' ' + nameHelper.state('error');
      }
      else if (active.get('done')) {
        status = 'Done.';
        className += ' ' + nameHelper.state('done');
      }
      else {
        status = 'Loading...';
      }
    }

    return (
      <FileInput className={className}
        trigger={<Button file large>Select file</Button>}
        footer='All filetypes allowed (Max filesize: 8MB)'
        onChange={this.onChange}>

        <NotaryUploadSettings cursor={cursor.cursor('settings')}>
          {this.props.children}
        </NotaryUploadSettings>

        <h3>Drag & drop your documents in the box</h3>

        {status}
      </FileInput>
    );
  },
  onChange: function (files) {
    var cursor = this.props.cursor;
    var options = { file: files[0] };
    _.extend(options, cursor.cursor('settings').toJS());
    var message = notaryUploadMessage(options);
    
    if (cursor.get('message'))
      this.props.dispatch(notaryUploadMessage.cancel());
    
    cursor.set('message', message);
    this.props.dispatch(message);
  }
});