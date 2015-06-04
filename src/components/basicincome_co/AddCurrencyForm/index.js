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
    installedPlatform: React.PropTypes.bool,
    doInstallPlatformStep: React.PropTypes.string,
    APIurl: React.PropTypes.string,
    subscribeCommand: React.PropTypes.string,

  },
  render: function () {
console.log(this.props.network+"haha")
var LoadPlatforms = new Basicincome_coPlatforms()

var datalistElement = LoadPlatforms.datalistElement()
      
var ModalBody;

ModalBody = <div className={nameHelper.ref('network')}>

                                        <legend style={{fontSize:17, margin:10}}>What financial Network ?</legend>

                                        <Input list ="platforms" value={this.props.network} onChange={this.props.onNetwork}/>
                                        {datalistElement}
                                        
                                        <Button onClick={this.props.onCheckPlatforms}>Next</Button>
                                        
                                        </div>;

if(this.props.installedPlatform === false) ModalBody = <div className={nameHelper.ref('installedPlatformFalse')}> 
                                                                        
                                                                        <div style={{fontSize:17, margin:10}}>Basicincome.co has not yet installed this platform. Install it ?</div>
                                                                        <Button onClick={this.props.onDoInstallPlatformStep}>Yes</Button><Button>Cancel</Button>
                                                                        </div>;
                                                                        
if(this.props.doInstallPlatformStep === "set api url") ModalBody = <div className={nameHelper.ref('set api url')}> 
                                          
                           
                                                                        <div style={{fontSize:17, margin:10}}>Installing API to: {this.props.network}</div>
                                                                        <Input value={this.props.APIurl} placeholder="API url, ex http://api.ripple.com" onChange={this.props.onAPIurl}/>
                                                                        <Button onClick={this.props.onEnterAPIurl}>Next</Button><Button>Cancel</Button>
                                                                        </div>;
                                                                        
if(this.props.doInstallPlatformStep === "upload subscribe command") ModalBody = <div className={nameHelper.ref('upload subscribe command')}> 
                                          
                           
                                                                        <div style={{fontSize:17, margin:10}}>Installing API commands for: {this.props.APIurl}</div>
                                                                        <Textarea style={{margin:10, width:'50%',height:'200%'}} value={this.props.subscribeCommand} onChange={this.props.onMsgEnterSubscribe}/><br/>
                                                                        <Button onClick={this.props.onSubscribeCommand}>Next</Button><Button>Cancel</Button>
                                                                        </div>;

if(this.props.doInstallPlatformStep === "cannot install") ModalBody = <div className={nameHelper.ref('cannot install')}> 
                                          
                           
                                                                        <div style={{fontSize:27, margin:10}}>Basicincome.co could not install {this.props.network}. Someone from Bitnation will install it manually within 24 hours. Check back tomorrow ! #fail</div>
                                                                        </div>;


if (this.props.network !== null && this.props.currency ===null && this.props.installedPlatform === true) ModalBody = <div className={nameHelper.ref('currency')}> 
                                                                        
                                                                        <legend>What Currency ?</legend>
                                                                        
                                                                        <Input value={this.props.currency}/>
                                                                        
                                                                        <Button onClick={this.props.onCurrency}>Next</Button>
                                                                        
                                                                        </div>;  
                                                                        
if (this.props.currency !== null && this.props.dividendRate ===null) ModalBody = <div className={nameHelper.ref('dividendRate')}> 
                                                                        
                                                                        <legend>What DividendRate ?</legend>

                                                                        <Input value={this.props.dividendRate}/>
                                                                        
                                                                        <Button onClick={this.props.onSend}>Next</Button>
                                                                        
                                                                        </div>;
      return(
           
            <div className={nameHelper.className}>
            
            {ModalBody}

            </div>
 
    );



    
  }
    
  
});