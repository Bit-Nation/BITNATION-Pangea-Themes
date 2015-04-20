var Bitnation = require('./bitnation.core.js');
require('./bitnation.horizon.js');
require('./bitnation.encryption.js');
var jQuery = require('jquery');

(function (Bitnation, $) {

    /**
     * Notary service class
     */
    var Service = function () {
        var notaryService = {};

        /**
         * Initialise the Horizon client
         */
        var _hzClient = new Bitnation.horizon.Client();

        var _verifyNotaryUri = function (uri) {
            // Arbitrary safe uri max length of 100 for now
            var maxLength = 100;

            var accepted = (
                uri !== undefined &&
                typeof uri === 'string' &&
                uri.length > 0 &&
                uri.length <= maxLength
            );

            return accepted;
        }

        /**
         * Retrieve and parse a notary hash record
         */
        notaryService.retrieveNotary = function (txId) {
            var deferred = $.Deferred();

            _hzClient.readMessage(txId)
            .done(function (tx) {

                var err = Bitnation.core.errors._ERR_INVALID_MESSAGE;

                if (tx.message == undefined) {
                    return deferred.reject(err);
                }

                var protoMsg = Bitnation.core.ProtocolMessage();

                var message = protoMsg.fromString(tx.message);

                return (message === false) ?
                    deferred.reject(err) :
                    deferred.resolve(message);

            })
            .fail(function (err) {
                deferred.reject(err);
            });

            return deferred;
        };

        /**
         * Perform a hash on a file
         */
        notaryService.hashFile = function (file) {
            var fileHasher = new Bitnation.encryption.FileHasher(file);
            return fileHasher.getHash(file);
        };

        /**
         * Notarize a document, saving its hash into the Horizon blockchain
         */
        notaryService.notarizeDocument = function (file, secretPhrase, uri) {
            var deferred = $.Deferred();

            // Hash the file
            this.hashFile(file)
            .done(function (hash) {

                // Get HZ address from user's secret phrase
                _hzClient.getAccountId(secretPhrase)
                .done(function (accountIds) {

                    // Post to the blockchain
                    var message = new Bitnation.core.ProtocolMessage(
                        accountIds.accountRS, 'notary', { hash: hash }
                    );

                    if (_verifyNotaryUri(uri)) {
                        message.setFuncAttribute('uri', uri);
                    }

                    // Save the data in the blockchain
                    _hzClient.sendMessage(
                        message.accountRS, message.toString(), secretPhrase
                    ).done(function (response) {
                        var tx = response.transactionJSON;

                        deferred.resolve({
                            message: tx.attachment.message,
                            blockHeight: tx.ecBlockHeight,
                            txId: tx.transaction
                        });

                    })
                    .fail(function (err) {
                        deferred.reject(err);
                    });

                })
                .fail(function (err) {
                    deferred.reject(err);
                });

            })
            .fail(function (err) {
                deferred.reject(err);
            });

            return deferred;

        };

        return notaryService;
    };

    Bitnation.notary = {
        Service: Service
    };

})(Bitnation || {}, jQuery);