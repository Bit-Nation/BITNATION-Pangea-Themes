var Bitnation = require('./bitnation.core.js');
var jQuery = require('jquery');

(function (Bitnation, $) {

    /**
     * HTTP Client
     */
    var Client = function (baseUrl, dataType) {
        if (dataType === 'undefined') {
            dataType = 'json';
        }

        var httpClient = {};

        httpClient.baseUrl = baseUrl;

        /**
         * Build a FQ URL from a passed URI
         */
        httpClient.buildUrl = function (uri) {
            return [this.baseUrl, uri].join("/");
        };

        /**
         * Send an HTTP request
         */
        httpClient.sendRequest = function (method, uri, params, cbSuccess, cbFail, cbAlways) {
            var deferred = $.Deferred();

            $.ajax({
                url: this.buildUrl(uri),
                type: method.toUpperCase(),
                dataType: 'json',
                data: params
            })
            .done(function (result, status, xhr) {
                deferred.resolve(result);
            })
            .fail(function (xhr, status, err) {
                deferred.reject(err);
            });

            return deferred;
        };

        return httpClient;
    }

    Bitnation.http = {
        Client: Client
    };

})(Bitnation || {}, jQuery);