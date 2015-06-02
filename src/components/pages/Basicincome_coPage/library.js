var Basicincome_co = function () {};

    Basicincome_co.prototype.parseCurrencies = function (item) {
        var msg = item.attachment.message
        
        if(msg.indexOf("Basicincome.co")>-1){
        // preserve newlines, etc - use valid JSON
        msg = msg.replace(/\\n/g, "\\n")  
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");
        // remove non-printable and other non-valid JSON chars
        msg = msg.replace(/[\u0000-\u0019]+/g,""); 
        console.log(msg)
        var msg = JSON.parse(msg);
        console.log(msg)
        if(typeof(msg.bitnation.dapp.id) !== 'undefined'){
            msg = msg.bitnation.dapp.data.currencies
        console.log(msg)
        return msg
        }
    }
        
    }
    

    module.exports = Basicincome_co;