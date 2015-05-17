var Bitnation = require('./bitnation.core');
require('./bitnation.horizon');
require('./bitnation.notary');
require('./bitnation.storage');
var jQuery = require('jquery');

(function (Bitnation, $) {

    /**
     * Initialise the Horizon client
     */
    var _hzClient = new Bitnation.horizon.Client();

    var _notaryService = new Bitnation.notary.Service();

    var _localStorageClient = new Bitnation.storage.LocalClient();
    var _localStorageKeys = {
        horizonAccount: 'hzAccount'
    };

    /**
     * UI Service Class
     */
    var UI = function () {
        var uiService = {};

        /**
         * Log a user in
         */
        uiService.login = function (secretPhrase) {
            var deferred = $.Deferred();

            _hzClient.getAccountId(secretPhrase)
            .then(function (result) {
                _localStorageClient.set(_localStorageKeys.horizonAccount, result);
                deferred.resolve(result);
            })
            .fail(function (err) {
                deferred.reject(err);
            });

            return deferred.promise();
        };

        /**
         * Check if a user is logged in
         */
        uiService.isLoggedIn = function () {
            return !!this.getCurrentUser();
        };

        /**
         * If there is a user logged in, return it
         */
        uiService.getCurrentUser = function () {
            var user = _localStorageClient.get(_localStorageKeys.horizonAccount);
            return (!!user) ? user : false;
        };

        /**
         * Log a user out
         */
        uiService.logout = function () {
            return _localStorageClient.remove(_localStorageKeys.horizonAccount);
        };

        /**
         * Create a new Horizon account
         */
        uiService.createHzAccount = function () {
            var account = new Bitnation.horizon.Account();
            return account.create();
        };

        /**
         * Return a HorizonAccount for the given accountRS
         */
        uiService.getHzAccount = function (accountRS) {
            return _hzClient.getAccount(accountRS);
        };

        /**
         * Get a Horizon address from its secret phrase
         */
        uiService.getHzAddress = function (secretPhrase) {
            var deferred = $.Deferred();

            _hzClient.getAccountId(secretPhrase)
            .done(function (account) {
                deferred.resolve(account.accountRS);
            })
            .fail(function (err) {
                deferred.reject(err);
            });

            return deferred.promise();
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

        /**
         * Get a list of messages for an account on the HZ blockchain.
         */
        uiService.getMail = function (account) {
            var deferred = $.Deferred();

            _hzClient.getMessages(account)
            .done(function (msgList) {
                var parsedMessages = [];

                msgList.forEach(function (item) {
                    item.date = _hzClient.timestampToDate(item.blockTimestamp);
                });

                deferred.resolve(msgList);

            })
            .fail(function (err) {
                deferred.reject(err);
            });

            return deferred.promise();
        }

        /**
         * Read a single message from the HZ blockchain.
         */
        uiService.readMessage = function (txId, secretPhrase) {
            return _hzClient.readMessage(txId, secretPhrase);
        };

        /**
         * Send a message via the HZ blockchain.
         */
        uiService.sendMessage = function (recipient, message, secretPhrase, encrypted) {
            return _hzClient.sendMessage(recipient, message, secretPhrase, encrypted);
        };

        /**
         * Expose Horizon errors
         */
        uiService.hzErrors = Bitnation.horizon.errors;

        return uiService;

    };

    Bitnation.pangea = {
        UI: UI
    };

})(Bitnation || {}, jQuery);

module.exports = Bitnation;