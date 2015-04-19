var Bitnation = require('./bitnation.core.js');
var jQuery = require('jquery');
var CryptoJS = require('crypto-js');

(function (Bitnation, $, CryptoJS) {

    /**
     * File hasher for the notary feature
     */
    var FileHasher = function (file) {
        if (!window.File && !window.FileReader && !window.FileList && !window.Blob) {
            throw 'The File APIs are not fully supported by your browser.';
        }

        var fileHasher = {};

        /**
         * Set the hasher's file
         */
        fileHasher.file = file;

        /**
         * Perform a sha256 hash on the file
         */
        fileHasher.getHash = function () {
            var reader = new FileReader();
            var deferred = $.Deferred();

            /**
             * Perform the hashing when the file has loaded.
             */
            reader.onloadend = function (e) {
                var sha256 = CryptoJS.algo.SHA256.create();

                var content = e.target.result;
                var decoded = CryptoJS.enc.Latin1.parse(content);
                sha256.update(decoded);

                var hash = sha256.finalize();
                deferred.resolve(hash.toString());
            };

            /**
             * On error, reject the promise
             */
            reader.onerror = function () {
                deferred.reject(this);
            };

            reader.readAsBinaryString(this.file);

            return deferred.promise();
        };

        return fileHasher;
    }

    Bitnation.encryption = {
        FileHasher: FileHasher
    };

})(Bitnation || {}, jQuery, CryptoJS);