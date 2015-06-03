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
    network: React.PropTypes.string,
    currency: React.PropTypes.string,
    dividendRate: React.PropTypes.string,

  },
  render: function () {
    console.log("bajs")
    console.log("hej" +this.props.network)
    if(this.props.network!=='undefined'){
      return(
       <div className={nameHelper.className}>
       
        <div className={nameHelper.ref('network')}>
          <legend>What financial Network ?</legend>

          <Input value={this.props.network}
            onChange={this.props.onNetwork} />
        </div>
        
        
         <div className={nameHelper.ref('submit')}>
          <Button onClick={this.render}>Next</Button>
        </div>
     </div>
      );
    }
    else{
    return (
     
<div className={nameHelper.className}>
       
        <div className={nameHelper.ref('currency')}>
          <legend>What currency ?</legend>

          <Input value={this.props.currency}
            onChange={this.props.onRecipientRS} />
        </div>
        
        
         <div className={nameHelper.ref('submit')}>
          <Button onClick={this.render}>Next</Button>
        </div>
     </div>

       
    );
  }
    
  }
});