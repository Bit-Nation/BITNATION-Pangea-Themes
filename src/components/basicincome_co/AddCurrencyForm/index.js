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

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    network: React.PropTypes.string,
    currency: React.PropTypes.string,
    dividendRate: React.PropTypes.string,

  },
  render: function () {
      
var input;

if (this.props.network===null) input = <div className={nameHelper.ref('network')}>

                                        <legend>What financial Network ?</legend>

                                        <Input value={this.props.network}/>
                                        
                                        <button onClick={this.props.onNetwork}>Next</button>
                                        
                                        </div>;
                                        
if (this.props.network !== null && this.props.currency ===null) input = <div className={nameHelper.ref('currency')}> 
                                                                        
                                                                        <legend>What Currency ?</legend>

                                                                        <Input value={this.props.currency}/>
                                                                        
                                                                        <button onClick={this.props.onCurrency}>Next</button>
                                                                        
                                                                        </div>;
                                                                        
if (this.props.currency !== null && this.props.dividendRate ===null) input = <div className={nameHelper.ref('dividendRate')}> 
                                                                        
                                                                        <legend>What DividendRate ?</legend>

                                                                        <Input value={this.props.dividendRate}/>
                                                                        
                                                                        <button onClick={this.props.onSend}>Next</button>
                                                                        
                                                                        </div>;
      return(
           
            <div className={nameHelper.className}>
            
            {input}
            
            </div>
 
    );



    
  }
    
  
});