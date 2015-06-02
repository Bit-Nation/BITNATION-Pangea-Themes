// todo: store currency/dividendRate/network values in encrypted messages on blockchain

/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../../lib/nameHelper')('AddCurrencyForm');
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
    encrypted: React.PropTypes.bool,
    recipient: React.PropTypes.string,
    secret: React.PropTypes.string,
    content: React.PropTypes.string,
    platform: React.PropTypes.string,
    currency: React.PropTypes.string,
    dividendRate: React.PropTypes.string,

  },
  getInitialState: function() {

    return {
      selectPlatform: null,
      platforms: ["Bitcoin", "Ripple", "HZ", "NXT"]
    };
  },
  render: function () {
    return (
      
      
      
      <div className={nameHelper.className}>
      
    
      
        <div id="AddCurrencyModal">
          <legend>Choose platform</legend>

          <Input list="platforms" placeholder="Bitcoin" value={this.props.platform}
            onChange={this.props.onPlatform}/>
          <datalist id="platforms">
          <option value="Bitcoin"/>
          <option value="Ripple"/>
          <option value="HZ"/>
          <option value="NXT"/>

          </datalist><div className="floatRight">
          <Button onClick={this.onNext}>Next</Button>
          
        </div>
        </div>

       

        
     </div>
    );
  },
  onNext: function(platform){
      
    if(platform === "Bitcoin"){
    React.render(
       <div>
          BITCOIN
          </div>,
              document.getElementById("AddCurrencyModal")

      )
    }
}
});