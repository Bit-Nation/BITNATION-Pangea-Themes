// remixed the mail-page to add my basicincome.co. needs to be re-worked. //Johan


// the users should store their currency/dividendRate/platform data in some smart way, on the HZ blockchain ?



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
      editCurrencyModalOpen: false,
      sendMessageModalOpen: false,
      myAccountRS: user.accountRS,
      selectPlatform: null,
      msgContent: null,
      msgRecipient: null,
      msgRecipientPubkey: null,
      msgEncrypted: false
    };
  },
  componentWillMount: function() {

    ui.getMail(this.state.myAccountRS)
      .done(this.onFetchCurrencies)
      .fail(this.onFail);

  },
  render: function() {
    return (
      <div className={nameHelper.className}>
      
      
      // user should select platform (Bitcoin, Ripple, etc.), then choose currency 
      // (platforms can have multiple currencies, Ripple has an infnite number), then choose dividendRate.
      // if a platform isn't 'installed', the user will get the option to install it
      // the user has to fetch API data from the platform he wants to install
      // for example, if he wants to add Stellar, he has to provide API urls for some stuff
      // adding new platforms and new currencies should be easy, and crowdsourced.
      // see this animation for an example: http://i.imgur.com/jJU9D0p.gif
      
      // for now, just add what can be added, and it'll figure itself out step by step
      
      // and delete this message because it doesn't work with Jquery
      
        <Modal title='Add currency'
          closed={!this.state.AddCurrencyModalOpen}
          onClose={this.closeAddCurrencyModal}>
          <AddCurrencyForm
            onPlatform={this.onSelectPlatform}
            onSend={this.submitCurrency} />
        </Modal>


        // placeholder, modal to edit currency
        // pseudo-code. delete this note too.
         <Modal
          closed={!this.state.editCurrencyModalOpen}
          onClose={this.closeEditCurrencyModal}>
          <label/>//currency
          <label/>//platform
          <input/>//dividendRate
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
                <Button key='addContact' autoHeight>Graph</Button>
              ]}>
                <Button key='submitCurrency' autoHeight onClick={this.openAddCurrencyModal}>Add currency</Button>
              <div></div><br/>
              <Results>
                <Table head={[<b>IOU</b>, <b>Dividend</b>, <b>Network</b>]}
                  body={this.state.messages} />
              </Results>
            </ControlSection>
          </PageRow>
        </div>

      
      </div>
    );
  },
  
  // these functions are psuedo-code remixes of the mail-page
  closeEditCurrencyModal: function () {
    this.setState({
      editCurrencyModalOpen: false,
      currentMessage: null
    });
  },
  openAddCurrencyModal: function () {
    this.setState({
      AddCurrencyModalOpen: true
    });
  },
  closeAddCurrencyModal: function () {
    this.setState({
      AddCurrencyModalOpen: false
    });
  },
  onSelectPlatform: function (platform) {
    this.setState({
      selectPlatform: platform
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
  onFetchCurrencies: function (currencyList) {

    var currencies = [];

    currencyList.forEach(function (item) {

      var currency = (item.currency == this.state.currency) ?
        this.state.myAccountRS + ' (you)' : this.state.myAccountRS;

      var line = [
        item.date.toUTCString(), currency
      ];

      dividendRate = (item.dividendRate !== undefined) ?
        <span onClick={this.readMessage.bind(null, item, false)}>{item.attachment.message.substr(0, 50)} &hellip;</span> :
        <span onClick={this.readMessage.bind(null, item, true)}>encrypted (click to decrypt) &hellip;</span>;

      line.push(dividendRate);

      currencies.push(line);

    }, this);

    this.setState({
      currencies: currencies
    });

  },
  editCurrency: function (message) {
    this.setState({
      currentMessage: message,
      editCurrencyModalOpen: true
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
  submitCurrency: function () {
    var ui = new Bitnation.pangea.UI();

    if (this.state.platform === '') {
      return alert('You haven'+"t"+'chosen a platform');
    }

    ui.submitCurrency(
      this.state.selectPlatform
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

    var result = result;
    alert('Success! Transaction ID: ' + result);
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
