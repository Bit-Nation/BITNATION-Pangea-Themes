  onMessages: function (msgList) {
    var messages = [];
    var currencies = [];
    currencies.push("HEEEEJ")
         this.setState({
      currencies: currencies
    });


    msgList.forEach(function (item) {
      var data = JSON.parse(item.attachment.message)
      console.log(data)
      if(item.SenderRS == this.state.myAccountRS && typeof(data.bitnation.dapp.id) !== 'undefined') {
        console.log(data)
        var msg = {
          tx_id: item.transaction,
          data: data.bitnation.dapp.data
          
        }
        console.log(msg)
        // check revisions
         messages.forEach(function (item) {
           console.log(item.data.revision)
           if(item.data.revision === msg.tx_id) {}
         })
         
         var p = <span onClick={this.readMessage.bind(null, item, false)}>{msg.data.substr(0, 50)} &hellip;</span>
         
         currencies = p
         console.log(currencies)
      }
      
      var msgFrom = (item.senderRS == this.state.myAccountRS) ?
        this.state.myAccountRS + ' (you)' : this.state.myAccountRS;

      var msg = [
        item.date.toUTCString(), msgFrom
      ];

      msgElement = (item.attachment.message !== undefined) ?
        <span onClick={this.readMessage.bind(null, item, false)}>{item.attachment.message.substr(0, 50)} &hellip;</span> :
        <span onClick={this.readMessage.bind(null, item, true)}>encrypted (click to decrypt) &hellip;</span>;

      msg.push(msgElement);

      messages.push(msg);

    }, this);

    this.setState({
      messages: messages
    });

  },
