var Basicincome_co =  function(){}
        Basicincome_co.prototype.platformList = function(){

    var platformList = ["Bitcoin", "Ripple"]
    return platformList
        }
    
    Basicincome_co.prototype.datalistElement = function(){
        var datalist = []
        datalistElement = <datalist id="platforms">
               <option value="Bitcoin"/>
               <option value="Ripple"/>
               </datalist>
               
        datalist.push(datalistElement)
        
        
        return datalist
    }
    
    Basicincome_co.prototype.currencyDatalistElement = function(platform){
        
         var datalist = []
         if(platform === "Bitcoin"){
        datalistElement = <datalist id="currencies">
               <option value="BTC"/>
               </datalist>
         }
         if(platform === "Ripple"){
             datalistElement = <datalist id="currencies">
               <option value="USD"/>
               <option value="EUR"/>
               <option value="CNY"/>
               <option value="JPY"/>
               <option value="BTC"/>
               </datalist>
         }
        datalist.push(datalistElement)
        
        
        return datalist
    }
    




               
module.exports = Basicincome_co