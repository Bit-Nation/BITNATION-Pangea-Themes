var Bitnation = require('./bitnation.core.js');
require('./bitnation.horizon.js');
require('./bitnation.encryption.js');
var jQuery = require('jquery');

(function (Bitnation, $) {

    /**
     * The notary feature will throw errors in the range
     * -201 through -299.
     */
    var _errorRange = -200;

    /**
     * An error thrown when a notarized document fails to verify
     */
    var _ERR_INVALID_NOTARY = {
        errorCode: _errorRange - 1,
        errorDescription: 'This is not a valid notarized document.'
    };

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
         * Verify a notary transaction and its message
         */
        notaryService.verifyNotary = function (txId, messageTx) {
            var deferred = $.Deferred();

            var invalidMessageErr = Bitnation.core.errors.invalidMessage;

            if (messageTx.message == undefined &&
                messageTx.decryptedMessage === undefined) {
                deferred.reject(invalidMessageErr);
            }

            var protoMsg = Bitnation.core.ProtocolMessage();

            var message = (messageTx.message === undefined) ?
                protoMsg.fromString(messageTx.decryptedMessage) :
                protoMsg.fromString(messageTx.message);

            if (message.bitnation === undefined) {
                deferred.reject(invalidMessageErr);
            }

            // Find the tx itself
            _hzClient.getTransaction(txId)
            .done(function (transaction) {
                var sender = transaction.senderRS;
                var recipient = transaction.recipientRS;

                if (sender !== recipient) {
                    return deferred.reject(_ERR_INVALID_NOTARY);
                }

                var response = {
                    verifiedNotary: message,
                    owner: sender
                };

                return deferred.resolve(response);

            })
            .fail(function (err) {
                deferred.reject(err);
            });

            return deferred.promise();
        };

        /**
         * Retrieve and parse a notary hash record
         * @todo: Private / encrypted
         */
        notaryService.retrieveNotary = function (txId, secretPhrase) {
            var deferred = $.Deferred();

            var verifyNotary = this.verifyNotary;

            _hzClient.readMessage(txId, secretPhrase)
            .done(function (messageTx) {

                verifyNotary(txId, messageTx)
                .done(function (result) {
                    deferred.resolve(result);
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
        notaryService.notarizeDocument = function (file, secretPhrase, uri, isPrivate) {
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
                        message.accountRS, message.toString(), secretPhrase, isPrivate
                    ).done(function (result) {
                        var tx = result.transactionJSON;

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