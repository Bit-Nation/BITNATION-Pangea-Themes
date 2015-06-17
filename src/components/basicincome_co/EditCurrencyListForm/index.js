/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('EditCurrencyListForm');
var bitnMixins = require('../../lib/bitnMixins');
var Button = require('../../controls/Button');
var Input = require('../../controls/Input');
var Textarea = require('../../controls/Textarea');
var Radio = require('../../controls/Radio');
var FileInput = require('../../controls/FileInput');

var Bitnation = require('../../../bitnation/bitnation.pangea');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    currency: React.PropTypes.string,
    dividendRate: React.PropTypes.string,
    network: React.PropTypes.string,
    secret: React.PropTypes.string,
    stepSelector: React.PropTypes.string,
    CurrencyObjectNumber: React.PropTypes.string

  },
  render: function () {
    
    
                    console.log(this.props.onPromptSign)

    var ModalBody
    ModalBody = <div className={nameHelper.ref('input-form')}>
    
                <div className={nameHelper.ref('currency')}>
                <legend>{this.props.currency}</legend>
                </div>

                <div className={nameHelper.ref('dividendRate')}>
                <legend></legend>
                <Input placeholder={this.props.dividendRate}
                onChange={this.props.onDividendRate} />
                </div>

                <div className={nameHelper.ref('network')}>
                <legend>{this.props.network}</legend>
                </div>
                
               
                
                <div className={nameHelper.ref('submit')}>
                <Button onClick={this.props.doPromptSignUpdate}>Update</Button><Button onClick={this.props.doPromptSignRemove}>Delete</Button>
                </div>
                
                </div>
                
    if(this.props.stepSelector === "prompt sign update") ModalBody = <div className={nameHelper.ref('prompt-sign')}>
    
                                              <div>
                                              <legend>Enter your secret phrase to update: {this.props.currency} to {this.props.dividendRate*100}%</legend>
                                              <Input value={this.props.secret} onChange={this.props.onSecret}/>
                                              </div>
                                              
                                              <div className={nameHelper.ref('submit')}>
                                              <Button onClick={this.props.onUpdate}>Sign</Button>
                                              </div>
                                              
                                              </div>
                                              
    if(this.props.stepSelector === "prompt sign remove") ModalBody = <div className={nameHelper.ref('prompt-sign')}>
    
                                              <div>
                                              <legend>Enter your secret phrase to remove: {this.props.currency}</legend>
                                              <Input value={this.props.secret} onChange={this.props.onSecret}/>
                                              </div>
                                              
                                              <div className={nameHelper.ref('submit')}>
                                              <Button onClick={this.props.onRemove}>Sign</Button>
                                              </div>
                                              
                                              </div>                
        
    return (
      
      
      <div className={nameHelper.className}>
      
      {ModalBody}
      
      </div>

    );
  }
});