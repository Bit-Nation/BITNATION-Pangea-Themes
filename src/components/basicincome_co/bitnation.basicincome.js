var Bitnation = require('../../bitnation/bitnation.core.js');
require('../../bitnation/bitnation.horizon.js');
var jQuery = require('jquery');

(function (Bitnation, $) {

 var Service = function () {
        var basicincomeService = {};

basicincomeService.saveCurrencyObject = function (msgContent, secretPhrase) {
    
 
        var _hzClient = new Bitnation.horizon.Client();
            var deferred = $.Deferred();


      var msgContent = { "currencies": [ { "currency": "BTC", "dividendRate": "NaN%", "network": "Bitcoin"},{ "currency": "USD", "dividendRate": "1%", "network": "Ripple"},{ "currency": "CNY", "dividendRate": "0.03", "network": "Ripple"}],"revision": "revision_tx_id"}


// Get HZ address from user's secret phrase
                _hzClient.getAccountId(secretPhrase)
                .done(function (accountIds) {


 // Post to the blockchain
                var message = new Bitnation.core.ProtocolMessage(
                    accountIds.accountRS, 'Basicincome_co', { data: msgContent }
                );
                console.log(accountIds.accountRS)
                console.log(message)
                

 // Save the data in the blockchain
                    _hzClient.sendMessage(
                        message.accountRS, message.toString(), secretPhrase
                    ).done(function (result) {
                        var tx = result.transactionJSON;
                        console.log(result)
                        var response = {
                            blockHeight: tx.ecBlockHeight,
                            txId: tx.transaction
                        };

                        response.message = (tx.attachment.encryptedMessage === undefined) ?
                            tx.attachment.message : 'encrypted';

                        deferred.resolve(response);

                    })
                    .fail(function (err) {
                        deferred.reject(err);
                    });

                })
                .fail(function (err) {
                    deferred.reject(err);
                });
                return deferred;
}
  
    var ProtocolMessage = function (accountRS, func, params) {
        var message = {};

        /**
         * Set a function attribute
         */
        message.setFuncAttribute = function (key, value) {
            this.attributes[func][key] = value;
        };

        /**
         * Parse a message string
         */
        message.fromString = function (data) {
            try {
                if (
                    typeof data !== 'string' ||
                    data.substring(0, 12) !== '{"bitnation"'
                ) {
                    return false;
                }

                return JSON.parse(data);

            } catch (err) {
                throw err;
            }
        };

        /**
         * Convert to a string for saving in the HZ blockchain
         */
        message.toString = function (argument) {
            return JSON.stringify(this.attributes);
        };

        message.attributes = {
            bitnation: {
                version: _BITNATION_VERSION
            }
        };

        // Skip the rest if accountRS isn't set
        if (accountRS == undefined) {
            return message;
        }

        message.attributes[func] = params;

        message.accountRS = accountRS;

        return message;
    };
     
             return basicincomeService;

 };
  
  
    Bitnation.basicincome = {
        Service: Service
    };

})(Bitnation || {}, jQuery);  

module.exports = Bitnation;