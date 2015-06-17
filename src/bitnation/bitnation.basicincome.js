var Bitnation = require('./bitnation.core.js');
require('./bitnation.horizon.js');
var jQuery = require('jquery');

(function (Bitnation, $) {


    /**
     * Basicincome.co service class
     */
    var Service = function () {
        var basicincomeService = {};

        /**
         * Initialise the Horizon client
         */
        var _hzClient = new Bitnation.horizon.Client();
        
      
        
        /**
         * Add a new currency
         */
         
        basicincomeService.addNewObject = function (currencyObjects, NewObject) {
            var deferred = $.Deferred();
            if(currencyObjects === null) currencyObjects = []
            var CurrencyObjectsUpdated = []
          
            for(var i =0;i<currencyObjects.length;i++){
              CurrencyObjectsUpdated.push({ "currency": currencyObjects[i].currency, "dividendRate": currencyObjects[i].dividendRate, "network": currencyObjects[i].network}) 
            }

            CurrencyObjectsUpdated.push({ "currency": NewObject.currency, "dividendRate": String(NewObject.dividendRate), "network": NewObject.network}) 
            
            console.log(CurrencyObjectsUpdated)

        deferred.resolve(CurrencyObjectsUpdated);
        return deferred;
        }
        
        /**
         * Update a currency
         */
         
        basicincomeService.updateExistingObject = function (CurrencyObjects, editDividendRate, EditCurrencyObjectNumber) {
            
        var UpdatedCurrencyObjects = []



            for(var i =0;i<CurrencyObjects.length;i++){
                if(i===EditCurrencyObjectNumber) UpdatedCurrencyObjects.push({ "currency": CurrencyObjects[i].currency, "dividendRate": editDividendRate, "network": CurrencyObjects[i].network})

                if(i!==EditCurrencyObjectNumber) UpdatedCurrencyObjects.push({ "currency": CurrencyObjects[i].currency, "dividendRate": CurrencyObjects[i].dividendRate, "network": CurrencyObjects[i].network})
                  
            }
              return UpdatedCurrencyObjects
            
        }
        
        /**
         * Remove a currency
         */
         
        basicincomeService.removeExistingObject = function (CurrencyObjects, EditCurrencyObjectNumber) {
          var UpdatedCurrencyObjects = []
          
            for(var i =0;i<CurrencyObjects.length;i++){
              if(i!==EditCurrencyObjectNumber) UpdatedCurrencyObjects.push({ "currency": CurrencyObjects[i].currency, "dividendRate": CurrencyObjects[i].dividendRate, "network": CurrencyObjects[i].network}) 
            }
            return UpdatedCurrencyObjects     
        }        
        
  
   
             return basicincomeService;

 };
  
  
    Bitnation.basicincome = {
        Service: Service
    };

})(Bitnation || {}, jQuery);  

module.exports = Bitnation;