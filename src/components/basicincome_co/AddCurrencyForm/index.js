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
    platforms: React.PropTypes.array,

    dividendRateTime: React.PropTypes.bool,
    sendMessageTime: React.PropTypes.bool,
    installedPlatform: React.PropTypes.bool,
    doInstallPlatformStep: React.PropTypes.string,
    APIurl: React.PropTypes.string,
    subscribeCommand: React.PropTypes.string,
    
    onPromptSign: React.PropTypes.bool,
    secret: React.PropTypes.string,


  },
  render: function () {
var LoadPlatforms = new Basicincome_coPlatforms()

var datalistElement = LoadPlatforms.datalistElement()
      
var currencyDatalistElement = LoadPlatforms.currencyDatalistElement(this.props.network)
      
var ModalBody;


ModalBody = <div className={nameHelper.ref('network')}>

                                        <legend style={{fontSize:17, margin:10}}>What financial Network ?</legend>

                                        <Input list ="platforms" placeholder="eg. Bitcoin" value={this.props.network} onChange={this.props.onNetwork}/>
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
                                                                        <Input list ="currencies" placeholder="eg. BTC" value={this.props.currency} onChange={this.props.onCurrency}/>
                                                                        {currencyDatalistElement}
                                                                        <Button onClick={this.props.onSetCurrency}>Next</Button>
                                                                        
                                                                        </div>;  
                                                                        
if (this.props.currency !== null && this.props.dividendRateTime === true) ModalBody = <div className={nameHelper.ref('dividendRate')}> 
                                                                        
                                                                        <legend>What DividendRate ? </legend>

                                                                        <Input placeholder="eg. 0.02" value={this.props.dividendRate} onChange={this.props.onDividendRate}/>
                                                                        
                                                                        <Button onClick={this.props.doPromptSign}>Next</Button>
                                                                        
                                                                        </div>;
                                                                        
/* removed this code*/

/*
if (this.props.dividendRate !== null && this.props.sendMessageTime === true) ModalBody = <div className={nameHelper.ref('sendMessage')}> 
                                                                        
                                                                        
                                                                        
                                                                        <div></div>
                                                                        
                                                                        <Button onClick={this.props.doPromptSign}>Add</Button>
                                                                        
                                                                        </div>;
*/                                                                        

                                                                        
if (this.props.onPromptSign === true) ModalBody = <div className={nameHelper.ref('prompt-sign')}>
    
                                                  <div>
                                                  <legend>Enter your secret phrase to add: </legend>
                                                  <br/>
                                                  <legend>Network: {this.props.network}</legend>
                                                  <legend>Currency: {this.props.currency}</legend>
                                                  <legend>DividendRate: {this.props.dividendRate*100}%</legend>
                                                  <br/>
                                                  <Input value={this.props.secret} onChange={this.props.onSecret}/>
                                                  </div>
                                                  
                                                  <div className={nameHelper.ref('submit')}>
                                                  <Button onClick={this.props.onSend}>Sign</Button>
                                                  </div>
                                                  
                                                  </div>          
                                                                        
                                                                        
      return(
           
            <div className={nameHelper.className}>
            
            {ModalBody}

            </div>
 
    );



    
  }
    
  
});