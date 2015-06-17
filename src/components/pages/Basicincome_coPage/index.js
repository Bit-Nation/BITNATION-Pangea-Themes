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
require('../../../bitnation/bitnation.dapps');
require('../../../bitnation/bitnation.basicincome');

var Basicincome_coPlatforms = require('../../basicincome_co/Platforms/index.js');


var DAppService = new Bitnation.dapps.Service();
var basicincomeService = new Bitnation.basicincome.Service();

var ui = new Bitnation.pangea.UI();

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  getInitialState: function() {
    var user = ui.getCurrentUser();
    var DAppID = "Basicincome_co"

    return {
      myAccountRS: user.accountRS,
      DAppID: DAppID,
      DAppUserBlob: null,
      CurrencyObjects: null,
      MainBodyTable: null,
      
      graphView: false,
      signDividendsView: false,
      indiegogoView: false,

      
      AddCurrencyModalOpen: false,
      editCurrencyModalOpen: false,
      
      
      editCurrency: null,
      editDividendRate: null,
      editNetwork: null,      

      editSecret: null,

      editPlatforms: null,
      
      modalStepSelector: null,
      
      editAPIurl: null,
      editSubscribeCommand: null,

      EditCurrencyObjectNumber: null,
      
    };
  },
  componentWillMount: function() {
    
    DAppService.getDAppBlob(this.state.myAccountRS, this.state.DAppID)
    .done(this.loadDApp)
    .fail(this.onFail);

  },
  render: function() {
    
    var main_view =  <div>
              
              <Button key='addNewObject' autoHeight onClick={this.openAddCurrencyModal}>Add currency</Button>
              <div></div><br/>

              
              <Results>
                <Table head={[<b>IOU</b>, <b>DividendRate</b>, <b>Network</b>]}
                  body={this.state.MainBodyTable} />
              </Results>
           

              </div>
      
      if(this.state.signDividendsView === true) main_view = <div>
              
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
    
    
              
              
    if(this.state.graphView === true) main_view = <div>
                                                  <h1>GRAPH</h1>
                                                  <div>Basicincome.co features visualizations of your safety net. A proof of concept is available on:</div>
                                                   <div><a href="http://graph_dev.basicincome.co/">http://graph_dev.basicincome.co/</a></div> 
                                                   <div>estimated integration with Bitnation Pangea DApp: Q4 2015.</div>
                                                  </div>
                                                  
                                                  
    if(this.state.indiegogoView === true) main_view = <div>
                                                      <iframe width="560" height="315" src="https://www.youtube.com/embed/Yi4dc-HIlNo?list=PLb5pvPPb-bHO1ZKHWMq1YhM866vL-TeMy" frameborder="0" allowfullscreen></iframe>
                                                      <br/><br/>
                                                      <h1>NEW: <a href="https://www.indiegogo.com/projects/voluntary-basic-income-on-a-co-op-dividend-scheme/x/9577175">https://www.indiegogo.com/projects/voluntary-basic-income-on-a-co-op-dividend-scheme/x/9577175</a></h1>
                                                      </div>
                                                    
    return (
      <div className={nameHelper.className}>
       

        <Modal title='Add Currency'
          closed={!this.state.AddCurrencyModalOpen}
          onClose={this.closeAddCurrencyModal}>
          <AddCurrencyForm
            network={this.state.editNetwork}
            currency={this.state.editCurrency}
            dividendRate={this.state.editDividendRate}
            platforms={this.state.editPlatforms}
            
            
            APIurl={this.state.editAPIurl}
            subscribeCommand={this.state.editSubscribeCommand}
            
            onCurrency={this.onCurrency}
            onDividendRate={this.onDividendRate}
            onNetwork={this.onNetwork}

            stepSelector={this.state.modalStepSelector}
            onSetCurrency={this.onSetCurrency}

            onCheckPlatforms={this.onCheckPlatforms}
            onDoInstallPlatformStep={this.onDoInstallPlatformStep}
            onAPIurl={this.onAPIurl}
            onEnterAPIurl={this.onEnterAPIurl}
            onSubscribeCommand={this.onSubscribeCommand}
            onEnterSubscribeCommand={this.onEnterSubscribeCommand}

            onPromptSign={this.state.onPromptSign}
            secret={this.state.editSecret}
            onSecret={this.onSecret}
            doPromptSign={this.doPromptSign}

            closeModal={this.closeAddCurrencyModal}

            onSubmit={this.addNewObject} />
        </Modal>
        
          <Modal title='Edit Contract'
          closed={!this.state.editCurrencyModalOpen}
          onClose={this.closeEditCurrencyModal}>
          <EditCurrencyListForm
            currency={this.state.editCurrency}
            dividendRate={this.state.editDividendRate}
            network={this.state.editNetwork}

            onDividendRate={this.onDividendRate}

            stepSelector={this.state.modalStepSelector}

            CurrencyObjectNumber={this.state.EditCurrencyObjectNumber}
            
            onUpdate={this.updateCurrencyObjects}
            onRemove={this.RemoveCurrencyObject}
            
            doPromptSignUpdate={this.doPromptSignUpdate}
            doPromptSignRemove={this.doPromptSignRemove}
            
            secret={this.state.editSecret}
            onSecret={this.onSecret}
            
            />
          
        </Modal>
        
              <div className="Splashscreen-Header"><h1 className="Header-Logo">Basicincome.co</h1></div>

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
                <Button key='viewGraph' onClick={this.viewGraph} autoHeight>Graph</Button>,
                <Button key='viewIndiegogo' onClick={this.viewIndiegogo} autoHeight>On Indiegogo</Button>
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
      graphView: false,
      signDividendsView: false,
      indiegogoView: false,
    });
   

},
  viewSignDividends: function () {
    
    this.setState({
      graphView: false,
      indiegogoView: false,
      signDividendsView: true
    });
   

},
  viewGraph: function () {
    
    this.setState({
      signDividendsView: false,
      indiegogoView: false,
      graphView: true
    });
   

},
  viewIndiegogo: function () {
    
    this.setState({
      signDividendsView: false,
      graphView: false,
      indiegogoView: true,
    });
   

},

  openAddCurrencyModal: function () {
    // need to update
    var LoadPlatforms = new Basicincome_coPlatforms()
    var platformList = LoadPlatforms.platformList()

    
    this.setState({
      modalStepSelector:null,
      editPlatforms: platformList,
      AddCurrencyModalOpen: true,
    });

  },
  closeAddCurrencyModal: function () {
    this.setState({
      editCurrency: null,
      editDividendRate: null,
      editNetwork: null,
      editSecret: null,

      AddCurrencyModalOpen: false,


      editPlatforms: null,
     
      
    });
  },

  openEditCurrencyModal: function (i){

     this.setState({
       modalStepSelector:null,
       editCurrency: this.state.CurrencyObjects[i].currency,
       editDividendRate: this.state.CurrencyObjects[i].dividendRate,
       editNetwork: this.state.CurrencyObjects[i].network,
       
       EditCurrencyObjectNumber: i,
       
       editCurrencyModalOpen: true
    });

    
  },
  closeEditCurrencyModal: function (){
     this.setState({
      editCurrency: null,
      editDividendRate: null,
      editNetwork: null,
      editSecret: null,
      
      editCurrencyModalOpen: false,
      
      EditCurrencyObjectNumber: null
      
    });
    
  },
  
  onCurrency: function (currency) {
    this.setState({
      editCurrency: currency
    });
  },
  onDividendRate: function(dividendRate){
     this.setState({
      editDividendRate: dividendRate
    });
  },
  onNetwork: function (network) {

    this.setState({
      editNetwork: network
    })


  },
  onSecret: function (secret) {
    this.setState({
      editSecret: secret
    });
  },

  loadDApp: function (DAppUserBlob) {
      
          this.setState({
          DAppUserBlob: DAppUserBlob,
          DAppID: "Basicincome_co",
          CurrencyObjects: DAppUserBlob.data
          });

          var MainBodyTable = []

      
          for(var i=0;i<this.state.CurrencyObjects.length;i++){

            if(this.state.CurrencyObjects[i] !== undefined){    

            var currencyObject = [this.state.CurrencyObjects[i].currency, Number(this.state.CurrencyObjects[i].dividendRate)*100+"%", this.state.CurrencyObjects[i].network]
            var editButton = <Button key={'edit-' + i} className='floatRight' onClick={this.openEditCurrencyModal.bind(null, i)}>Edit</Button> 
            currencyObject.push(editButton)
            MainBodyTable.push(currencyObject)
            }
            else {
              var currencyObject = []
              MainBodyTable.push(currencyObject)
              console.log("no currencies added "+currencyObject)

            }
          }
    
    
    
    this.setState({
      MainBodyTable: MainBodyTable
    });


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
  
  addNewObject: function () {

    if (this.state.editSecret === null) {
      return alert('You must set your passphrase to send a message');
    }
    
    var NewObject = { "currency": this.state.editCurrency, "dividendRate": this.state.editDividendRate, 
    "network": this.state.editNetwork}
    
    var CurrencyObjects = this.state.CurrencyObjects
    var DAppID = this.state.DAppID
    var secret = this.state.editSecret
    basicincomeService.addNewObject(CurrencyObjects, NewObject)
    .done(function(updatedData){
   
      var userBlob = updatedData

    DAppService.saveDAppBlob(userBlob, DAppID, secret)
    .done(function(res){
      console.log("success !")
    })
    .fail(function(err){alert('Error :-( ... Check the logs')})
    })


    this.setState({
      editSecret: null
    });
    
    this.closeAddCurrencyModal()

  }, 
  RemoveCurrencyObject: function (){


    if (this.state.editSecret === '') {
      return alert('You must set your passphrase to send a message');
    }


    var UpdatedCurrencyObjects = basicincomeService.removeExistingObject(this.state.CurrencyObjects, this.state.EditCurrencyObjectNumber)


    DAppService.saveDAppBlob(UpdatedCurrencyObjects, this.state.DAppID, this.state.editSecret)
    
    this.closeEditCurrencyModal()

    
  }, 
  updateCurrencyObjects: function () {

    if (this.state.editSecret === '') {
      return alert('You must set your passphrase to send a message');
    }
    
    var UpdatedCurrencyObjects = basicincomeService.updateExistingObject(this.state.CurrencyObjects, this.state.editDividendRate, this.state.EditCurrencyObjectNumber)
    DAppService.saveDAppBlob(UpdatedCurrencyObjects, this.state.DAppID, this.state.editSecret)
    
    this.closeEditCurrencyModal()

    
    }, 
  


  onCheckPlatforms: function(){  
    
   
Array.prototype.contains = function(element){
    return this.indexOf(element) > -1;
};
var installedPlatformCheck = this.state.editPlatforms.contains(this.state.editNetwork)


if(installedPlatformCheck === true){
  this.setState({
      modalStepSelector: "set currency"
    })
}
else {
  this.setState({
      modalStepSelector: "install platform"
    })
}
     

    
},
  onSetCurrency: function(){
    this.setState({
      modalStepSelector: "set dividend Rate"
    });
  },
  doPromptSign: function(){
      this.setState({
      modalStepSelector: "prompt sign"
    });
  },


  onInstallPlatform: function(){
     this.setState({
      modalStepSelector: "set api url"
    })

  },
  onEnterAPIurl: function(){
    this.setState({
      modalStepSelector: "upload subscribe command"
    })
  },
  onEnterSubscribeCommand: function(){
     this.setState({
      modalStepSelector: "cannot install"
    })
  },

  onAPIurl: function(APIurl){
    this.setState({
      editAPIurl: APIurl
    })
  },
  onSubscribeCommand: function(subscribeCommand){
    this.setState({
      editSubscribeCommand: subscribeCommand
    })
  },

  
  doPromptSignUpdate: function(){
     this.setState({
      modalStepSelector: "prompt sign update"
    });
  },
  doPromptSignRemove: function(){
     this.setState({
      modalStepSelector: "prompt sign remove"
    });
  },
  



});