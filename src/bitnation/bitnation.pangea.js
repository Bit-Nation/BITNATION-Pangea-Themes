var Bitnation = require('./bitnation.core');
require('./bitnation.horizon');
require('./bitnation.notary');
var jQuery = require('jquery');

(function (Bitnation, $) {

    /**
     * Initialise the Horizon client
     */
    var _hzClient = new Bitnation.horizon.Client();

    var _notaryService = new Bitnation.notary.Service();

    /**
     * UI Service Class
     */
    var UI = function () {
        var uiService = {};

        /**
         * Log a user in
         */
        uiService.login = function (secretPhrase) {
            return _hzClient.getAccountId(secretPhrase);
        };

        /**
         * Return a HorizonAccount for the given accountRS
         */
        uiService.getHzAccount = function (accountRS) {
            return _hzClient.getAccount(accountRS);
        };

        /**
         * Return a Horizon account balance
         */
        uiService.getHzAccountBalance = function (accountRS) {
            var deferred = $.Deferred();

            this.getHzAccount(accountRS)
            .done(function (account) {
                deferred.resolve(account.getBalance());
            })
            .fail(function (err) {
                deferred.reject(err);
            });

            return deferred.promise();
        };

        /**
         * Verify a notary transaction
         */
        uiService.verifyNotary = function (txId, secretPhrase) {
            return _notaryService.retrieveNotary(txId, secretPhrase);
        };

        /**
         * Perform the whole notarization process
         */
        uiService.notarizeDocument = function (file, secretPhrase, uri, isPrivate) {
            return _notaryService.notarizeDocument(file, secretPhrase, uri, isPrivate);
        };

        return uiService;

    };

    Bitnation.pangea = {
        UI: UI
    };

})(Bitnation || {}, jQuery);

module.exports = Bitnation;