/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../../lib/nameHelper')('SendMessageForm');
var bitnMixins = require('../../../lib/bitnMixins');
var Button = require('../../../controls/Button');
var Input = require('../../../controls/Input');
var Textarea = require('../../../controls/Textarea');
var Radio = require('../../../controls/Radio');
var FileInput = require('../../../controls/FileInput');

var Bitnation = require('../../../../bitnation/bitnation.pangea');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    platform: React.PropTypes.string,
    currency: React.PropTypes.string
  },
  render: function () {
    return (
      <div className={nameHelper.className}>
      

        <div className={nameHelper.ref('platform')}>
          <legend>Choose platform</legend>

          <Input list="platforms" placeholder="Bitcoin" value={this.props.platform}
            onChange={this.props.onPlatform}/>
          <datalist id="platforms">
          <option value="Bitcoin"/>
          <option value="Ripple"/>
          <option value="HZ"/>
          <option value="NXT"/>

          </datalist><div className="floatRight">
          <Button onClick={this.props.onSend}>Next</Button>
        </div>
        </div>

       

        
     </div>
    );
  }
});