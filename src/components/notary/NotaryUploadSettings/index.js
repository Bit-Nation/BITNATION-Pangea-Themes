/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('NotaryUploadSettings');
var bitnMixins = require('../../lib/bitnMixins');
var Input = require('../../controls/Input');
var Radio = require('../../controls/Radio');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    children: React.PropTypes.node,
    cursor: React.PropTypes.object.isRequired
  },
  render: function () {
    var cursor = this.props.cursor;
    return (
      <div className={nameHelper.className}>
        <div className={nameHelper.ref('public')}>
          <legend>Please select</legend>

          <label>
            Private release

            <Radio name={this.formId('public')}
              value={false} checked={!cursor.get('public')}
              onChange={cursor.cursor('public')} />
          </label>

          <label>
            Public release

            <Radio name={this.formId('public')}
              value={true} checked={cursor.get('public')}
              onChange={cursor.cursor('public')} />
          </label>
        </div>

        <div className={nameHelper.ref('uri')}>
          <legend>A URI at which to locate the file (optional)</legend>

          <Input value={cursor.cursor('uri')}
            onChange={cursor.cursor('uri')} />
        </div>

        <div className={nameHelper.ref('secret')}>
          <legend>Your private key (required)</legend>

          <Input password value={cursor.cursor('secret')}
            onChange={cursor.cursor('secret')} />
        </div>
        
        {this.props.children}
      </div>
    );
  }
});