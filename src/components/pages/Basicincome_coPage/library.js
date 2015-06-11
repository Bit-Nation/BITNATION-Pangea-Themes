var Bitnation = require('../../../bitnation/bitnation.pangea');

var ui = new Bitnation.pangea.UI();
var user = ui.getCurrentUser();
var myAccountRS = user.accountRS

var Basicincome_co = function () {};


    Basicincome_co.prototype.fetchCurrencyList = function (item, messages) {
        var msg = item.attachment.message
        if(msg.indexOf("Basicincome.co")>-1 && messages.length === 0){
        // preserve newlines, etc - use valid JSON
        msg = msg.replace(/\\n/g, "\\n")  
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");
        // remove non-printable and other non-valid JSON chars
        msg = msg.replace(/[\u0000-\u0019]+/g,""); 
        var msg = JSON.parse(msg);
        if(typeof(msg.bitnation.dapp.id) !== 'undefined'){
            msg = msg.bitnation.dapp.data
            var lastUpdatedCurrencyTable = item.transaction
            var blob = [msg, lastUpdatedCurrencyTable]
        return blob
        }
    }
        
    }
    
    // it might be useful to track revisions, this is a placeholder
    Basicincome_co.prototype.trackRevisionHistory = function (revision_tx_id){
      
ui.getMail(myAccountRS)
      .done(onMessages)
function onMessages(msgList){
        msgList.forEach(function (item) {
            console.log(item)
})

    }
}

    Basicincome_co.prototype.updateCurrencyList = function (messages, lastUpdatedCurrencyTable) {}

    Basicincome_co.prototype.bitnationProtocolMessage = function (msgContent, messages) {
        console.log(msgContent)
        console.log(messages)
        var msgElement = ""
        console.log()
        if (messages.indexOf('Currency')!==-1)for(var i =0;i<messages.length;i++){
            msgElement = msgElement + '{ "currency": "'+ messages[i][0]+'", "dividendRate": "'+String(messages[i][1].slice(0, - 1))/100+'", "network": "'+messages[i][2]+'"},'
   
        }
        console.log(msgElement)
        var message = '{"bitnation": {"version": "0.1.0", "dapp": {"id": "Basicincome.co", "data": { "currencies": [ '+msgElement+msgContent+
        
         "],"+ '"revision": "revision_tx_id"}}}}'
        
        console.log(message)
        
        return message
        
    }


    module.exports = Basicincome_co;
    
    