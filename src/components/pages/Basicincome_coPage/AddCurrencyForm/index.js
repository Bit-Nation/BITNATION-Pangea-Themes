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
      
      // this modal doesn't do everything it should do.
      // user should select platform (Bitcoin, Ripple, etc.), then choose currency 
      // (platforms can have multiple currencies, Ripple has an infnite number), then choose dividendRate.
      // if a platform isn't 'installed', the user will get the option to install it
      // the user has to fetch API data from the platform he wants to install
      // for example, if he wants to add Stellar, he has to provide API urls for some stuff
      // adding new platforms and new currencies should be easy, and crowdsourced.
      // see this animation for an example: http://i.imgur.com/jJU9D0p.gif
      
      // for now, just add what can be added, and it'll figure itself out step by step
      
      // and delete this message because it doesn't work with Jquery
      
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