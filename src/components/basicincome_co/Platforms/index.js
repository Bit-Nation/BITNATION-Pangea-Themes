var Basicincome_co =  function(){}
        Basicincome_co.prototype.platformList = function(){

    var platformList = ["Bitcoin", "Ripple", "Stellar"]
    return platformList
        }
    
    Basicincome_co.prototype.datalistElement = function(){
        var datalist = []
        datalistElement = <datalist id="platforms">
               <option value="Bitcoin"/>
               <option value="Ripple"/>
               <option value="Stellar"/>
               </datalist>
               
        datalist.push(datalistElement)
        
        
        return datalist
    }
    




               
module.exports = Basicincome_co