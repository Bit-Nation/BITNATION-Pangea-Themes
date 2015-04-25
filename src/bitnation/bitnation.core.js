var Bitnation = (function (Bitnation) {

    /**
     * The notary feature will throw errors in the range
     * -101 through -199.
     */
    var _errorRange = -100;

    /**
     * The current Bitnation Pangea version
     */
    var _BITNATION_VERSION = '0.0.1';

    /**
     * Returned when a message cannot be parsed
     */
    var _ERR_INVALID_MESSAGE = {
        errorCode: _errorRange - 1,
        errorDescription: 'This is not a valid Bitnation message.'
    };

    /**
     * A Bitnation protocol message
     */
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

    /**
     * Return the current Bitnation version
     */
    var getVersion = function () {
        return _BITNATION_VERSION;
    }

    Bitnation.core = {
        getVersion: getVersion,
        ProtocolMessage: ProtocolMessage,
        errors: {
            invalidMessage: _ERR_INVALID_MESSAGE
        }
    };

    return Bitnation;
})(Bitnation || {});

module.exports = Bitnation;