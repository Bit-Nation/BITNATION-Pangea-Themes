var Bitnation = require('./bitnation.core.js');
var jQuery = require('jquery');

(function (Bitnation, $) {

    /**
     * UI Service Class
     */
    var UI = function () {
        var uiService = {};

        /**
         * Initialise the Horizon client
         */
        uiService.hzClient = new Bitnation.horizon.Client();

        /**
         * Log a user in
         */
        uiService.login = function (secretPhrase) {
            return this.hzClient.getAccountId(secretPhrase);
        };

        /**
         * Return a HorizonAccount for the given accountRS
         */
        uiService.getHzAccount = function (accountRS) {
            return this.hzClient.getAccount(accountRS);
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

        return uiService;

    };

    Bitnation.pangea = {
        UI: UI
    };

})(Bitnation || {}, jQuery);