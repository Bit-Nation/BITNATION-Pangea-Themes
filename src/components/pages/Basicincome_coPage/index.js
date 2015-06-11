/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('Basicincome_coPage');
var bitnMixins = require('../../lib/bitnMixins');
var Icon = require('../../controls/Icon');
var Button = require('../../controls/Button');
var PageRow = require('../../layout/PageRow');
var PageSection = require('../../layout/PageSection');
var ControlSection = require('../../layout/ControlSection');
var Results = require('../../layout/Results');
var Modal = require('../../layout/Modal');
var Table = require('../../controls/Table');

var AddCurrencyForm = require('../../basicincome_co/AddCurrencyForm');
var EditCurrencyListForm = require('../../basicincome_co/EditCurrencyListForm');


var Bitnation = require('../../../bitnation/bitnation.pangea');
var Bitnation = require('../../basicincome_co/bitnation.basicincome');

var Basicincome_coPlatforms = require('../../basicincome_co/Platforms/index.js');
var Basicincome_co = require('./library.js');



var ui = new Bitnation.pangea.UI();

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  getInitialState: function() {
    var user = ui.getCurrentUser();

    return {
      AddCurrencyModalOpen: false,
      myAccountRS: user.accountRS,
      msgNetwork: null,
      msgCurrency: null,
      msgPlatforms: null,
      msgDividendRate: null,
      msgDividendRateTime: false,
      msgSendMessageTime: false,
      msgInstalledPlatform: null,
      msgDoInstallPlatform: false,
      
      onMsgPromptSign: false,
      msgSecret: null,
      
      lastUpdatedCurrencyTable: null,
      editCurrencyModalOpen: false,
      editCurrency: null,
      editDividendRate: null,
      EditCurrencyObjectNumber: null,
      onEditPromptSignUpdate: false,
      onEditPromptSignRemove: false,
      
      editNetwork: null,
      show_graph: false,
      show_signDividends: false,

    };
  },
  componentWillMount: function() {

    ui.getMail(this.state.myAccountRS)
      .done(this.onMessages)
      .fail(this.onFail);

  },
  render: function() {
    
    var main_view =  <div>
              
              <Button key='sendMessage' autoHeight onClick={this.openAddCurrencyModal}>Add currency</Button>
              <div></div><br/>

              
              <Results>
                <Table head={[<b>IOU</b>, <b>DividendRate</b>, <b>Network</b>]}
                  body={this.state.messages} />
              </Results>
             
              </div>
      
      if(this.state.show_signDividends === true) main_view = <div>
              
              <div>Basicincome.co will automate the process of paying out your dividends using <a href="http://motherboard.vice.com/read/smart-contracts-sound-boring-but-theyre-more-disruptive-than-bitcoin">smart contracts</a>. 
              Estimated to be integrated in <b>Q4</b> 2015.</div><br/>
              
              
              <Results>
                <Table head={['Address', 'Amount', 'Currency']}
                  body={[
                    ['1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v', '0.02', 'BTC', <Button key='sign' className='floatRight'>Sign</Button>],
                    ['1J4yuJFqozxLWTvnExR4Xxe9W4B89kaukY', '0.1', 'BTC', <Button key='sign' className='floatRight'>Sign</Button>]
                  ]} />
              </Results>
             
              </div>
    
    
              
              
    if(this.state.show_graph === true) main_view = <div>
                                                  <h1>GRAPH</h1>
                                                  <div>Basicincome.co features visualizations of your safety net. A proof of concept is available on:</div>
                                                   <div><a href="http://graph_dev.basicincome.co/">http://graph_dev.basicincome.co/</a></div> 
                                                   <div>estimated integration with Bitnation Pangea DApp: Q4 2015.</div>
                                                  </div>
                                                    
    return (
      <div className={nameHelper.className}>
       

        <Modal title='Add Currency'
          closed={!this.state.AddCurrencyModalOpen}
          onClose={this.closeAddCurrencyModal}>
          <AddCurrencyForm
            network={this.state.msgNetwork}
            currency={this.state.msgCurrency}
            dividendRate={this.state.msgDividendRate}
            platforms={this.state.msgPlatforms}
            
            dividendRateTime={this.state.msgDividendRateTime}
            sendMessageTime={this.state.msgSendMessageTime}
            installedPlatform={this.state.msgInstalledPlatform}
            doInstallPlatformStep={this.state.msgDoInstallPlatformStep}
            APIurl={this.state.msgAPIurl}
            subscribeCommand={this.state.msgSubscribeCommand}
            

            onNetwork={this.onMsgNetwork}
            onCurrency={this.onMsgCurrency}
            onDividendRate={this.onMsgDividendRate}
            onSetCurrency={this.onMsgSetCurrency}
            onSetDividendRate={this.onMsgSetDividendRate}

            onCheckPlatforms={this.onMsgCheckPlatforms}
            onDoInstallPlatformStep={this.onMsgDoInstallPlatformStep}
            onAPIurl={this.onMsgAPIurl}
            onEnterAPIurl={this.onMsgEnterAPIurl}
            onSubscribeCommand={this.onMsgSubscribeCommand}
            onEnterSubscribeCommand={this.onMsgEnterSubscribeCommand}

            onPromptSign={this.state.onMsgPromptSign}
            secret={this.state.msgSecret}
            onSecret={this.onMsgSecret}
            doPromptSign={this.doMsgPromptSign}

            closeModal={this.closeAddCurrencyModal}

            onSend={this.sendMessage}
            onEncrypted={this.onMsgEncrypted} />
        </Modal>
        
          <Modal title='Edit Contract'
          closed={!this.state.editCurrencyModalOpen}
          onClose={this.closeEditCurrencyModal}>
          <EditCurrencyListForm
            currency={this.state.editCurrency}
            dividendRate={this.state.editDividendRate}
            network={this.state.editNetwork}
            CurrencyObjectNumber={this.state.EditCurrencyObjectNumber}
            onUpdate={this.updateCurrencyList}
            onRemove={this.onRemoveCurrencyObject}
            onDividendRate={this.onEditDividendRate}
            
            onPromptSignUpdate={this.state.onEditPromptSignUpdate}
            onPromptSignRemove={this.state.onEditPromptSignRemove}
            doPromptSignUpdate={this.doEditPromptSignUpdate}
            doPromptSignRemove={this.doEditPromptSignRemove}
            secret={this.state.msgSecret}
            onSecret={this.onMsgSecret}
            
            />
          
        </Modal>
        
              <div className="Splashscreen-Header"></div>


        <div>
          <PageRow>
            <ControlSection flex={1} 
              title={[
                'Basicincome.co',
                <Icon key='icon' type='user' />
              ]}
              controls={[
                <Button key='Manage currencies' onClick={this.viewNormal} autoHeight>Manage currencies</Button>,
                <Button key='Sign dividends' onClick={this.viewSignDividends} autoHeight>Sign dividends</Button>,
                <Button key='viewGraph' onClick={this.viewGraph} autoHeight>Graph</Button>
              ]}>
              
              {main_view}
              
            </ControlSection>
          </PageRow>
        </div>
      </div>
    );
  },
  viewNormal: function () {
    
    this.setState({
      show_graph: false,
      show_signDividends: false
    });
   

},
  viewSignDividends: function () {
    
    this.setState({
      show_graph: false,
      show_signDividends: true
    });
   

},
  viewGraph: function () {
    
    this.setState({
      show_signDividends: false,
      show_graph: true
    });
   

},

  openAddCurrencyModal: function () {
    
    var LoadPlatforms = new Basicincome_coPlatforms()
    var platformList = LoadPlatforms.platformList()

    
    this.setState({
      msgPlatforms: platformList,
      AddCurrencyModalOpen: true,
    });

  },
  closeAddCurrencyModal: function () {
    this.setState({
      AddCurrencyModalOpen: false,
      
      msgNetwork: null,
      msgCurrency: null,
      msgPlatforms: null,
      msgDividendRate: null,
      msgDividendRateTime: false,
      msgSendMessageTime: false,
      msgInstalledPlatform: null,
      msgDoInstallPlatform: false,
      msgSecret: null,
      doMsgPromptSign:false
      
    });
  },
  onMsgSecret: function (secret) {
    this.setState({
      msgSecret: secret
    });
    console.log(this.state.msgSecret)
  },
  onMsgNetwork: function (network) {

    this.setState({
      msgNetwork: network
    })


  },
  onMsgCheckPlatforms: function(){  
    
   
Array.prototype.contains = function(element){
    return this.indexOf(element) > -1;
};
var installedPlatformCheck = this.state.msgPlatforms.contains(this.state.msgNetwork)
if(installedPlatformCheck === true){}
     this.setState({
      msgInstalledPlatform: installedPlatformCheck
    })

    
},
  onMsgDoInstallPlatformStep: function(){
     this.setState({
      msgDoInstallPlatformStep: "set api url"
    })

  },
  onMsgAPIurl: function(APIurl){
    this.setState({
      msgAPIurl: APIurl
    })
  },
  onMsgEnterAPIurl: function(){
    this.setState({
      msgDoInstallPlatformStep: "upload subscribe command"
    })
  console.log(this.state.msgDoInstallPlatformStep)
  },
  onMsgSubscribeCommand: function(){
     this.setState({
      msgDoInstallPlatformStep: "cannot install"
    })
  },
  onMsgEnterSubscribeCommand: function(subscribeCommand){
    this.setState({
      msgSubscribeCommand: subscribeCommand
    })
  },
  onMsgCurrency: function (currency) {
    this.setState({
      msgCurrency: currency
    });
  },
  onMsgSetCurrency: function(){
    this.setState({
      msgDividendRateTime: true
    });
  },
  onMsgDividendRate: function(dividendRate){
     this.setState({
      msgDividendRate: dividendRate
    });
  },
  onMsgSetDividendRate: function(){
     this.setState({
      msgSendMessageTime: true
    });
  },
  doMsgPromptSign: function(){
      this.setState({
      onMsgPromptSign: true
    });
  },
  onMessages: function (msgList) {

    var messages = []
    console.log("messages is: "+messages)
    msgList.forEach(function (item) {
    var BCO = new Basicincome_co();
    var returnedItem = BCO.fetchCurrencyList(item, messages);

    if(returnedItem !==undefined){
            lastUpdatedCurrencyTable = returnedItem[1]
    returnedItem = returnedItem[0]

    //BCO.revisionHistory(returnedItem.revision)
    returnedItem = returnedItem.currencies
          console.log(returnedItem)
          for(var i=0;i<returnedItem.length;i++){
            console.log(returnedItem[i])
            if(returnedItem[i] !== undefined){    

            var msg = [returnedItem[i].currency, Number(returnedItem[i].dividendRate)*100+"%", returnedItem[i].network]
            msgElement = <Button key={'edit-' + i} className='floatRight' onClick={this.editCurrencyListObject.bind(null, i)}>Edit</Button> 
            msg.push(msgElement)
            messages.push(msg)
            }
            else {
              var msg = []
              messages.push(msg)
              console.log("no currencies added "+msg)

            }
          }

    }



    }, this);

    this.setState({
      messages: messages
    });

  },
  sendMessage: function () {
    var ui = new Bitnation.pangea.UI();

    if (this.state.msgSecret === '') {
      return alert('You must set your passphrase to send a message');
    }
    
    msgContent = '{ "currency": "'+ this.state.msgCurrency+'", "dividendRate": "'+this.state.msgDividendRate+'", "network": "'+this.state.msgNetwork+'"}'
   
    var BCO = new Basicincome_co();
    var messageContent = BCO.bitnationProtocolMessage(msgContent, this.state.messages);
    ui.sendMessage(
      this.state.myAccountRS,
      messageContent,
      this.state.msgSecret,
      this.state.msgEncrypted,
      this.state.msgRecipientPubkey
    )
    .done(this.onSent)
    .fail(this.onFail);

    this.setState({
      msgSecret: null
    });

  },
  onSent: function (result) {
    this.setState({
      msgContent: null,
      msgRecipient: null
    });
    this.closeAddCurrencyModal();

    console.log(result);

    var txId = result.transaction;
    
    var inputSuccessRes = 'Success! Transaction ID: ' + txId + '\n' +
                          'It will take some minutes for the blockchain to show your data.'
                          
    alert(inputSuccessRes)                      
  },
  onFail: function (err) {

    console.error(err);

    if (err.errorCode === 4) {
      var incorrectInputErr = 'Incorrect input.\n' +
                              'The recipient account must have published ' +
                              'their public key to the blockchain before you ' +
                              'can send them mail.';
      alert(incorrectInputErr);
    } else {
      alert('Error :-( ... Check the logs');
    }

  },
  editCurrencyListObject: function (i){

    console.log(this.state.messages[i])

     this.setState({
       editDividendRate: String(this.state.messages[i][1].slice(0, - 1))/100,
       editCurrency: this.state.messages[i][0],
       editNetwork: this.state.messages[i][2],
       EditCurrencyObjectNumber: i,
       editCurrencyModalOpen: true
    });
    
  },
  closeEditCurrencyModal: function (){
    console.log("closing modal")
     this.setState({
      msgSecret: null,
      editDividendRate: null,
      editCurrency: null,
      editNetwork: null,
      
      onEditPromptSignRemove: false,
      onEditPromptSignUpdate: false,
      EditCurrencyObjectNumber: null,
      
      editCurrencyModalOpen: false
    });
    
  },
  onRemoveCurrencyObject: function (){
        var messages = this.state.messages
        var msgElement = "" 

    for(var i =0;i<messages.length;i++){
      if(i!==this.state.EditCurrencyObjectNumber) {
        msgElement = msgElement + '{ "currency": "'+ messages[i][0]+'", "dividendRate": "'+String(messages[i][1].slice(0, - 1))/100+'", "network": "'+messages[i][2]+'"}'
        if(i!==messages.length-2 && i!==messages.length-1 && i!==messages.length)msgElement = msgElement + ","
      }
      
    }
    console.log(msgElement)
    this.sendUpdateMessage(msgElement)
  },
  onEditDividendRate: function(dividendRate){
     this.setState({
      editDividendRate: dividendRate
    });
  },
  doEditPromptSignUpdate: function(){
     this.setState({
      onEditPromptSignUpdate: true
    });
  },
  doEditPromptSignRemove: function(){
     this.setState({
      onEditPromptSignRemove: true
    });
  },
  updateCurrencyList: function () {
        var messages = this.state.messages
        var msgElement = ""

    msgElement = msgElement + '{ "currency": "'+ messages[this.state.EditCurrencyObjectNumber][0]+'", "dividendRate": "'+this.state.editDividendRate+'", "network": "'+messages[this.state.EditCurrencyObjectNumber][2]+'"}'


for(var i =0;i<messages.length;i++){
      if(i!==this.state.EditCurrencyObjectNumber) {
        msgElement = msgElement +"," +'{ "currency": "'+ messages[i][0]+'", "dividendRate": "'+String(messages[i][1].slice(0, - 1))/100+'", "network": "'+messages[i][2]+'"}'
      }
}
      
      

    
    
    this.sendUpdateMessage(msgElement)
  },
  sendUpdateMessage: function(msgElement){
     var ui = new Bitnation.pangea.UI();

    if (this.state.msgSecret === '') {
      return alert('You must set your passphrase to send a message');
    }
    

    var BCO = new Basicincome_co();
    var messageContent = BCO.bitnationProtocolMessage(msgElement, 'undefined');
    ui.sendMessage(
      this.state.myAccountRS,
      messageContent,
      this.state.msgSecret,
      this.state.msgEncrypted,
      this.state.msgRecipientPubkey
    )
    .done(this.onSent)
    .fail(this.onFail);
    
    this.closeEditCurrencyModal()
   
    
    
    
    
  }


});