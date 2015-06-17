var Bitnation = require('./bitnation.core.js');
require('./bitnation.horizon.js');
var jQuery = require('jquery');

(function (Bitnation, $) {


    /**
     * DApp service class
     */
    var Service = function () {
        var DAppService = {};

        /**
         * Initialise the Horizon client
         */
        var _hzClient = new Bitnation.horizon.Client();
        
        
        /**
         * Get the DApps user-blob from the Horizon blockchain
         */
         
        DAppService.getDAppBlob = function (account, DAppID) {
            // DAppID example: "AddressBook"
            var deferred = $.Deferred();

            // get messages from the Horizon blockchain
            _hzClient.getMessages(account)
            .done(function(msgList) {
                
                // filter out the DApps blob with DAppID
                var protoMsg = Bitnation.core.ProtocolMessage();

                for(var i=0;i<msgList.length; i++){

                    var msg = protoMsg.fromString(msgList[i].attachment.message);
                    if (DAppID in msg) { 
                        deferred.resolve(msg[DAppID]);
                        break;


                    };
            
                }
            })  
             .fail(function (err) {
                        deferred.reject(err);
                    });
            return deferred;

            
        }
         
       
        
        /**
         * Save the DApp user-blob on the Horizon blockchain
         */
         
        DAppService.saveDAppBlob = function (userBlob, DAppID, secretPhrase) {
            var deferred = $.Deferred();


                // Get HZ address from user's secret phrase
                _hzClient.getAccountId(secretPhrase)
                .done(function (accountIds) {

                
                // Post to the blockchain
                var message = new Bitnation.core.ProtocolMessage(
                    accountIds.accountRS, DAppID, { data: userBlob }
                );
                console.log(accountIds.accountRS)
                console.log(message)
                

                    // Save the data in the blockchain
                    _hzClient.sendMessage(
                        message.accountRS, message.toString(), secretPhrase
                    ).done(function (result) {
                        
                       

                        deferred.resolve(result);

                    })
                    .fail(function (err) {
                        deferred.reject(err);
                    });

                })
                .fail(function (err) {
                    console.log("error: wrong secret phrase")
                    deferred.reject(err);
                });
                return deferred;
}
  
   
             return DAppService;

 };
  
  
    Bitnation.dapps = {
        Service: Service
    };

})(Bitnation || {}, jQuery);  

module.exports = Bitnation;