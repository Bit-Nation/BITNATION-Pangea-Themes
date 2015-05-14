var Bitnation = require('./bitnation.core');
var jQuery = require('jquery');
var localStorage = require('localStorage');

(function (Bitnation, $) {

    /**
     * Serialize some data
     */
    var _serialize = function (data) {
        return JSON.stringify(data);
    };

    /**
     * Unserialize some data
     */
    var _unserialize = function (data) {
        return JSON.parse(data);
    }

    /**
     * Local data storage client
     */
    var LocalClient = function () {
        var client = {};

        /**
         * Store some data
         */
        client.set = function (key, data) {

            return localStorage.setItem(key, _serialize(data));

        };

        /**
         * Retrieve some data
         */
        client.get = function (key) {

            return _unserialize(localStorage.getItem(key));

        };

        /**
         * Delete some data
         */
        client.remove = function (key) {

            return localStorage.removeItem(key);

        };

        return client;
    };

    Bitnation.storage = {
        LocalClient: LocalClient
    };

})(Bitnation || {}, jQuery);

module.exports = Bitnation;