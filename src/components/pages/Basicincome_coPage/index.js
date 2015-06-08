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
var Basicincome_coPlatforms = require('../../basicincome_co/Platforms/index.js');
var Basicincome_co = require('./library.js');

var ui = new Bitnation.pangea.UI();

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  getInitialState: function() {
    var user = ui.getCurrentUser();

    return {
      currentMessage: null,
      messageModalOpen: false,
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
      msgSecret: null,
      msgContent: null,
      msgRecipient: null,
      msgRecipientPubkey: null,
      msgEncrypted: false,
      lastUpdatedCurrencyTable: null,
      editCurrencyModalOpen: false,
      editCurrency: null,
      editDividendRate: null,
      editNetwork: null

    };
  },
  componentWillMount: function() {

    ui.getMail(this.state.myAccountRS)
      .done(this.onMessages)
      .fail(this.onFail);

  },
  render: function() {
    return (
      <div className={nameHelper.className}>
        <Modal
          closed={!this.state.messageModalOpen}
          onClose={this.closeMessageModal}>
          <p>{this.state.currentMessage}</p>
        </Modal>

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
            content={this.state.msgContent}
            secret={this.state.msgSecret}
            recipient={this.state.msgRecipient}
            encrypted={this.state.msgEncrypted}
            onRecipientRS={this.onMsgRecipient}
            onRecipientPubkey={this.onMsgRecipientPubkey}
            onContent={this.onMsgContent}
            onSecret={this.onMsgSecret}
            onNetwork={this.onMsgNetwork}
            onCheckPlatforms={this.onMsgCheckPlatforms}
            onDoInstallPlatformStep={this.onMsgDoInstallPlatformStep}
            onAPIurl={this.onMsgAPIurl}
            onEnterAPIurl={this.onMsgEnterAPIurl}
            onSubscribeCommand={this.onMsgSubscribeCommand}
            onEnterSubscribeCommand={this.onMsgEnterSubscribeCommand}
            onCurrency={this.onMsgCurrency}
            onSetCurrency={this.onMsgSetCurrency}
            onDividendRate={this.onMsgDividendRate}
            onSetDividendRate={this.onMsgSetDividendRate}

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
            onRecipientRS={this.onMsgRecipient}
            onRecipientPubkey={this.onMsgRecipientPubkey}
            onDividendRate={this.onEditDividendRate}
            onSecret={this.onMsgSecret}
            onSend={this.sendMessage}
            onEncrypted={this.onMsgEncrypted} />
          
        </Modal>
        
              <div className="Splashscreen-Header"></div>


        <div>
          <PageRow>
            <ControlSection flex={1}
              title={[
                'Manage currencies',
                <Icon key='icon' type='user' />
              ]}
              controls={[
                <Button key='addContact' onClick={this.viewGraph} autoHeight>Graph</Button>
              ]}>
               <div id="graph">
              
              <Button key='sendMessage' autoHeight onClick={this.openAddCurrencyModal}>Add currency</Button>
              <div></div><br/>

              
              <Results>
                <Table head={[<b>IOU</b>, <b>DividendRate</b>, <b>Network</b>]}
                  body={this.state.messages} />
              </Results>
              </div>
            </ControlSection>
          </PageRow>
        </div>
      </div>
    );
  },
  viewGraph: function () {
    
    React.render(
      
        <div>GRAPH: http://graph_dev.basicincome.co/#r46XJq7UJmoPno2cURDRs8bB9crRLJgpcY</div>,
        document.getElementById("graph")
    );

},
  closeMessageModal: function () {
    this.setState({
      messageModalOpen: false,
      currentMessage: null
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
      AddCurrencyModalOpen: false
    });
  },
  onMsgContent: function (content) {
    this.setState({
      msgContent: content
    });
  },
  onMsgSecret: function (secret) {
    this.setState({
      msgSecret: secret
    });
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
if(installedPlatformCheck === true){console.log(installedPlatformCheck)}
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
    console.log(APIurl)
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
  onMsgRecipient: function (recipient) {
    this.setState({
      msgRecipient: recipient
    });
  },
  onMsgRecipientPubkey: function (pubKey) {
    this.setState({
      msgRecipientPubkey: pubKey
    });
  },
  onMsgEncrypted: function (encrypted) {
    this.setState({
      msgEncrypted: encrypted
    });
  },
  onMessages: function (msgList) {

    var messages = [];
    msgList.forEach(function (item) {
    
    var BCO = new Basicincome_co();
    var returnedItem = BCO.fetchCurrencyList(item, messages);
    console.log(returnedItem)
    
    if(returnedItem !==undefined){
            console.log(returnedItem)
            lastUpdatedCurrencyTable = returnedItem[1]
    returnedItem = returnedItem[0]

    //BCO.revisionHistory(returnedItem.revision)
    returnedItem = returnedItem.currencies
          for(var i=0;i<returnedItem.length;i++){
                

            var msg = [returnedItem[i].currency, Number(returnedItem[i].dividendRate)*100+"%", returnedItem[i].network]
            msgElement = <Button key={'edit-' + i} className='floatRight' onClick={this.editCurrencyListObject.bind(null, i)}>Edit</Button> 
            msg.push(msgElement)
            console.log(msg)
            messages.push(msg)
          }
          
    }



    }, this);

    this.setState({
      messages: messages
    });

  },
  displayMessage: function (message) {
    this.setState({
      currentMessage: message,
      messageModalOpen: true
    });
  },
  readMessage: function (tx, isEncrypted) {
    var ui = new Bitnation.pangea.UI();
    var secret = React.findDOMNode(this.refs.secret).value;

    if (isEncrypted !== false && secret === '') {
      return alert('You must enter your passphrase to check encrypted mail.');
    }

    ui.readMessage(tx.transaction, secret)
    .done(this.displayMessage)
    .fail(this.onFail);

    React.findDOMNode(this.refs.secret).value = '';
  },
  sendMessage: function () {
    var ui = new Bitnation.pangea.UI();

    if (this.state.msgSecret === '') {
      return alert('You must set your passphrase to send a message');
    }
    
    msgContent = '{ "currency": "'+ this.state.msgCurrency+'", "dividendRate": "'+this.state.msgDividendRate+'", "network": "'+this.state.msgNetwork+'"}'
   
    var BCO = new Basicincome_co();
    var messageContent = BCO.bitnationProtocolMessage(msgContent);
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
    alert('Success! Transaction ID: ' + txId);
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
  console.log(i)

    console.log(this.state.messages[i])

     this.setState({
       editDividendRate: this.state.messages[i][1],
       editCurrency: this.state.messages[i][0],
       editNetwork: this.state.messages[i][2],
      editCurrencyModalOpen: true
    });
    
  },
  closeEditCurrencyModal: function (){
    
    this.setState({
      editCurrencyModalOpen: false
    });
    
  }
});
