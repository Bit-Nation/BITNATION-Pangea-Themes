// remixed the mail-page to add my basicincome.co. needs to be re-worked. //Johan


// the users should store their currency/dividendRate/platform data in some smart way, on the HZ blockchain ?



/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('Basicincome_coPage_old');
var bitnMixins = require('../../lib/bitnMixins');
var Icon = require('../../controls/Icon');
var Button = require('../../controls/Button');
var PageRow = require('../../layout/PageRow');
var PageSection = require('../../layout/PageSection');
var ControlSection = require('../../layout/ControlSection');
var Results = require('../../layout/Results');
var Modal = require('../../layout/Modal');
var Table = require('../../controls/Table');

var AddCurrencyForm = require('./AddCurrencyForm');

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
      msgEncrypted: false
    };
  },
  // fetch currency/dividendRate/network
  componentWillMount: function() {

    ui.getMail(this.state.myAccountRS)
      .done(this.onMessages)
      .fail(this.onFail);

  },
  render: function() {
    return (
      <div className={nameHelper.className}>
        <Modal title='Add currency'
          closed={!this.state.sendMessageModalOpen}
          onClose={this.closeSendMessageModal}>
          <AddCurrencyForm
          onPlatform={this.onSelectPlatform}
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
                <Button key='submitCurrency' autoHeight onClick={this.openSendMessageModal}>Add currency</Button>
    
              <div></div><br/>
              

              
              <Results>
                <Table head={[<b>IOU</b>, <b>Dividend</b>, <b>Network</b>]}
                   body={[
                    ['BTC', '2%', 'Bitcoin', <Button key='EditCurrency' className="floatRight" onClick={this.editCurrency}>Edit</Button>],
                    ['EUR', '1%', 'Ripple', <Button key='EditCurrency' className="floatRight" onClick={this.editCurrency}>Edit</Button>],
                    ['JPY', '0.5%', 'Ripple', <Button key='EditCurrency' className="floatRight" onClick={this.editCurrency}>Edit</Button>],
                  ]}
                  body={this.state.messages}/>
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
        <div>GRAPH</div>,
        document.getElementById("graph")
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

      var msgFrom = (item.senderRS == this.state.myAccountRS) ?
        this.state.myAccountRS + ' (you)' : this.state.myAccountRS;

      var msg = [
        item.date.toUTCString(), msgFrom
      ];

      msgElement = (item.attachment.message !== undefined) ?
        <span onClick={this.readMessage.bind(null, item, false)}>{item.attachment.message.substr(0, 50)} &hellip;</span> :
        <span onClick={this.readMessage.bind(null, item, true)}>encrypted (click to decrypt) &hellip;</span>;

      msg.push(msgElement);

      messages.push(msg);

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

  }

});
