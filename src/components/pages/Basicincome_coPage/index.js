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

var SendMessageForm = require('../../messaging/SendMessageForm');

var Bitnation = require('../../../bitnation/bitnation.pangea');

var ui = new Bitnation.pangea.UI();

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  getInitialState: function() {
    var user = ui.getCurrentUser();

    return {
      currentMessage: null,
      messageModalOpen: false,
      sendMessageModalOpen: false,
      myAccountRS: user.accountRS,
      msgSecret: null,
      msgContent: null,
      msgRecipient: null,
      msgRecipientPubkey: null,
      msgEncrypted: false,
      lastUpdatedCurrencyTable: null,
      editCurrencyModalOpen: false

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

        <Modal title='Send a message'
          closed={!this.state.sendMessageModalOpen}
          onClose={this.closeSendMessageModal}>
          <SendMessageForm
            content={this.state.msgContent}
            secret={this.state.msgSecret}
            recipient={this.state.msgRecipient}
            encrypted={this.state.msgEncrypted}
            onRecipientRS={this.onMsgRecipient}
            onRecipientPubkey={this.onMsgRecipientPubkey}
            onContent={this.onMsgContent}
            onSecret={this.onMsgSecret}
            onSend={this.sendMessage}
            onEncrypted={this.onMsgEncrypted} />
        </Modal>
        
          <Modal
          closed={!this.state.editCurrencyModalOpen}
          onClose={this.closeEditCurrencyModal}>
          <label/>currency
          <label/>platform
          <input/>dividendRate
          <button>Remove</button>
          <button>Update</button>
        </Modal>

        <div>
          <PageRow>
            <PageSection flex={3}>
              <h1>{this.state.myAccountRS}&#8217;s email</h1>
            </PageSection>
          </PageRow>
        </div>

        <div>
          <PageRow>
            <ControlSection flex={1}
              title={[
                'Encrypted mail',
                <Icon key='icon' type='lock' />
              ]}
              controls={[
                <Button key='sendMessage' autoHeight onClick={this.openSendMessageModal}>Send message</Button>,
                <Button key='addContact' autoHeight>Add contact</Button>
              ]}>
              <label>
                Passphrase (required to decrypt):
                <input ref="secret" type="password" />
              </label>
              <Results>
                <Table head={[<b>IOU</b>, <b>DividendRate</b>, <b>Network</b>]}
                  body={this.state.messages} />
              </Results>
            </ControlSection>
          </PageRow>
        </div>
      </div>
    );
  },
  closeMessageModal: function () {
    this.setState({
      messageModalOpen: false,
      currentMessage: null
    });
  },
  openSendMessageModal: function () {
    this.setState({
      sendMessageModalOpen: true
    });
  },
  closeSendMessageModal: function () {
    this.setState({
      sendMessageModalOpen: false
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
    var Basicincome_co = require('./library.js');
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
            msgElement = <Button key='EditCurrency' className="floatRight" id={"currencyListObject--"+(i)} onClick={this.editCurrencyListObject}>Edit</Button>
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

    ui.sendMessage(
      this.state.msgRecipient,
      this.state.msgContent,
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
    this.closeSendMessageModal();

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
  editCurrencyListObject: function (evt){
  
    var a = React.findDOMNode(evt.target)
    a = a.id
    //rip of anything that isn't a digit
    a = a.match(/\d+$/)[0]
    console.log(a)
    console.log(this.state.messages[a])

     this.setState({
      editCurrencyModalOpen: true
    });
    
  },
  closeEditCurrencyModal: function (){
    
    this.setState({
      editCurrencyModalOpen: false
    });
    
  }
});
