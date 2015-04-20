var Bitnation = (function (Bitnation) {

    var _BITNATION_VERSION = '0.0.1';

    /**
     * Generate a Bitnation protocol message
     */
    var protocolMessage = function (func, params) {
        message = {
            version: this.getVersion()
        };

        message[func] = params;

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
        protocolMessage: protocolMessage
    };

    return Bitnation;
})(Bitnation || {});

module.exports = Bitnation;