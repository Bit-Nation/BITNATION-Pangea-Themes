/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('AddCurrencyForm');
var bitnMixins = require('../../lib/bitnMixins');
var Button = require('../../controls/Button');
var Input = require('../../controls/Input');
var Textarea = require('../../controls/Textarea');
var Radio = require('../../controls/Radio');
var FileInput = require('../../controls/FileInput');

var Bitnation = require('../../../bitnation/bitnation.pangea');
var Basicincome_coPlatforms = require('../../basicincome_co/Platforms/index.js');



module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    network: React.PropTypes.string,
    currency: React.PropTypes.string,
    dividendRate: React.PropTypes.string,
    dividendRateTime: React.PropTypes.bool,
    sendMessageTime: React.PropTypes.bool,
    platforms: React.PropTypes.array,
    installedPlatform: React.PropTypes.bool,
    doInstallPlatformStep: React.PropTypes.string,
    APIurl: React.PropTypes.string,
    subscribeCommand: React.PropTypes.string,
    secret: React.PropTypes.string,


  },
  render: function () {
console.log(this.props.network+"haha")
var LoadPlatforms = new Basicincome_coPlatforms()

var datalistElement = LoadPlatforms.datalistElement()
      
var currencyDatalistElement = LoadPlatforms.currencyDatalistElement(this.props.network)
      
var ModalBody;
console.log(this.props.currency)
console.log("this.props.dividendRateTime"+this.props.dividendRateTime)

ModalBody = <div className={nameHelper.ref('network')}>

                                        <legend style={{fontSize:17, margin:10}}>What financial Network ?</legend>

                                        <Input list ="platforms" value={this.props.network} onChange={this.props.onNetwork}/>
                                        {datalistElement}
                                        
                                        <Button onClick={this.props.onCheckPlatforms}>Next</Button>
                                        
                                        </div>;

if(this.props.installedPlatform === false) ModalBody = <div className={nameHelper.ref('installedPlatformFalse')}> 
                                                                        
                                                                        <div style={{fontSize:17, margin:10}}>Basicincome.co has not yet installed this platform. Install it ?</div>
                                                                        <Button onClick={this.props.onDoInstallPlatformStep}>Yes</Button><Button onClick={this.props.closeModal}>Cancel</Button>
                                                                        </div>;
                                                                        
if(this.props.doInstallPlatformStep === "set api url") ModalBody = <div className={nameHelper.ref('set api url')}> 
                                          
                           
                                                                        <div style={{fontSize:17, margin:10}}>Installing API to: {this.props.network}</div>
                                                                        <Input value={this.props.APIurl} placeholder="API url, ex http://api.ripple.com" onChange={this.props.onAPIurl}/>
                                                                        <Button onClick={this.props.onEnterAPIurl}>Next</Button><Button onClick={this.props.closeModal}>Cancel</Button>
                                                                        </div>;
                                                                        
if(this.props.doInstallPlatformStep === "upload subscribe command") ModalBody = <div className={nameHelper.ref('upload subscribe command')}> 
                                          
                           
                                                                        <div style={{fontSize:17, margin:10}}>Installing API commands for: {this.props.APIurl}</div>
                                                                        <Textarea style={{margin:10, width:'50%',height:'200%'}} value={this.props.subscribeCommand} onChange={this.props.onMsgEnterSubscribe}/><br/>
                                                                        <Button onClick={this.props.onSubscribeCommand}>Next</Button><Button onClick={this.props.closeModal}>Cancel</Button>
                                                                        </div>;

if(this.props.doInstallPlatformStep === "cannot install") ModalBody = <div className={nameHelper.ref('cannot install')}> 
                                          
                           
                                                                        <div style={{fontSize:17, margin:10}}>Basicincome.co's <b>install new currencies</b> feature will be available Q4 2015.</div>
                                                                        <Button onClick={this.props.closeModal}>Ok</Button>
                                                                        </div>;


if (this.props.network !== null && this.props.installedPlatform === true && this.props.dividendRateTime === false) ModalBody = <div className={nameHelper.ref('currency')}> 
                                                                        
                                                                        <legend>What Currency ?</legend>
                                                                        <Input list ="currencies" value={this.props.currency} onChange={this.props.onCurrency}/>
                                                                        {currencyDatalistElement}
                                                                        <Button onClick={this.props.onSetCurrency}>Next</Button>
                                                                        
                                                                        </div>;  
                                                                        
if (this.props.currency !== null && this.props.dividendRateTime === true) ModalBody = <div className={nameHelper.ref('dividendRate')}> 
                                                                        
                                                                        <legend>What DividendRate ?</legend>

                                                                        <Input maxlength="7" value={this.props.dividendRate} onChange={this.props.onDividendRate}/>
                                                                        
                                                                        <Button onClick={this.props.onSetDividendRate}>Next</Button>
                                                                        
                                                                        </div>;
                                                                        
                                                                        
if (this.props.dividendRate !== null && this.props.sendMessageTime === true) ModalBody = <div className={nameHelper.ref('sendMessage')}> 
                                                                        
                                                                        
                                                                        <legend>Network: {this.props.network}</legend>
                                                                        <legend>Currency: {this.props.currency}</legend>
                                                                        <legend>DividendRate: {this.props.dividendRate}</legend>
                                                                        <legend>Secret phrase</legend>
                                                                        <Input value={this.props.secret} onChange={this.props.onSecret}/>
                                                                        <Button onClick={this.props.onSend}>Next</Button>
                                                                        
                                                                        </div>;
                                                                        
      return(
           
            <div className={nameHelper.className}>
            
            {ModalBody}

            </div>
 
    );



    
  }
    
  
});