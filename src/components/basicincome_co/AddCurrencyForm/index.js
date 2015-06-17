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

    stepSelector: React.PropTypes.string,

    APIurl: React.PropTypes.string,
    subscribeCommand: React.PropTypes.string,
    
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


if (this.props.stepSelector === "set currency") ModalBody = <div className={nameHelper.ref('currency')}> 
                                                                        
                                                                        <legend>What Currency ?</legend>
                                                                        <Input list ="currencies" placeholder="eg. BTC" value={this.props.currency} onChange={this.props.onCurrency}/>
                                                                        {currencyDatalistElement}
                                                                        <Button onClick={this.props.onSetCurrency}>Next</Button>
                                                                        
                                                                        </div>;  
                                                                        
if (this.props.stepSelector === "set dividend Rate") ModalBody = <div className={nameHelper.ref('dividendRate')}> 
                                                                        
                                                                        <legend>What DividendRate ? </legend>

                                                                        <Input placeholder="eg. 0.02" value={this.props.dividendRate} onChange={this.props.onDividendRate}/>
                                                                        
                                                                        <Button onClick={this.props.doPromptSign}>Next</Button>
                                                                        
                                                                        </div>;
                                                                        
                                                                 

                                                                        
if (this.props.stepSelector === "prompt sign") ModalBody = <div className={nameHelper.ref('prompt-sign')}>
    
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
                                                  <Button onClick={this.props.onSubmit}>Sign</Button>
                                                  </div>
                                                  
                                                  </div>          
                                                                        


if(this.props.stepSelector === "install platform") ModalBody = <div className={nameHelper.ref('installedPlatformFalse')}> 
                                                                        
                                                                        <div style={{fontSize:17, margin:10}}>Basicincome.co has not yet installed this platform. Install it ?</div>
                                                                        <Button onClick={this.props.onDoInstallPlatformStep}>Yes</Button><Button onClick={this.props.closeModal}>Cancel</Button>
                                                                        </div>;
                                                                        
if(this.props.stepSelector === "set api url") ModalBody = <div className={nameHelper.ref('set api url')}> 
                                          
                           
                                                                        <div style={{fontSize:17, margin:10}}>Installing API to: {this.props.network}</div>
                                                                        <Input value={this.props.APIurl} placeholder="API url, ex http://api.ripple.com" onChange={this.props.onAPIurl}/>
                                                                        <Button onClick={this.props.onEnterAPIurl}>Next</Button><Button onClick={this.props.closeModal}>Cancel</Button>
                                                                        </div>;
                                                                        
if(this.props.stepSelector === "upload subscribe command") ModalBody = <div className={nameHelper.ref('upload subscribe command')}> 
                                          
                           
                                                                        <div style={{fontSize:17, margin:10}}>Installing API commands for: {this.props.APIurl}</div>
                                                                        <Textarea style={{margin:10, width:'50%',height:'200%'}} value={this.props.subscribeCommand} onChange={this.props.onSubscribeCommand}/><br/>
                                                                        <Button onClick={this.props.onEnterSubscribeCommand}>Next</Button><Button onClick={this.props.closeModal}>Cancel</Button>
                                                                        </div>;

if(this.props.stepSelector === "cannot install") ModalBody = <div className={nameHelper.ref('cannot install')}> 
                                          
                           
                                                                        <div style={{fontSize:17, margin:10}}>Basicincome.co's <b>install new financial platforms</b> feature will be available Q4 2015.</div>
                                                                        <Button onClick={this.props.closeModal}>Ok</Button>
                                                                        </div>;

      return(
           
            <div className={nameHelper.className}>
            
            {ModalBody}

            </div>
 
    );



    
  }
    
  
});