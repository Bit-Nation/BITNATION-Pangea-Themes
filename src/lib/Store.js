/*

  Store abstract class
  
  getters are accessible as is from constructor
  they are also accesible from instances, but
  the first arg is bound to the local data value

  the data is indented to be an immutable js type
  and the updating to be done in a dispatcher handler

  example use

  var MessageStore = Store.extend({
    getInitialState: function () {
      return Immutable.List(); // can be any type
    },
    getKnown: function (data) {
      return data.filter(function (message) {
        return message.get('senderIsKnown');
      });
    },
    getUnread: function (data, known) {
      var messages = data.filter(function (message) {
        return message.get('read');
      });

      if (known) messages = this.getKnown(messages);
      
      return messages;
    },
  });
  
  var store = new MessageStore(data);

  // these are equal
  store.getUnread(true);
  MessageStore.getUnread(data, true);
  
*/

var _ = require('lodash');
var util = require('util');

var Store = module.exports = function Store (data) {
  this.data = data;
};

Store.extend = function (getters__) {
  function constructor (data) {
    if (!(this instanceof constructor))
      return new constructor(data);

    Store.call(this, data);
  };

  _.extend(constructor, this);
  util.inherits(constructor, this);

  _.times(arguments.length, function (i) {
    _.each(arguments[i], function (fn, key) {
      constructor[key] = fn;
      constructor.prototype[key] = fn.length == 0 ? fn : function (args__) {
        var args = [];
        for (var i = 0; i < arguments.length; i++)
          args[i] = arguments[i];

        this.constructor[key].apply(
          this.constructor, [ this.data ].concat(args));
      };
    });
  });

  return constructor;
};

Store.getInitialState = function () {};
Store.prototype.getInitialState = function () {
  return this.constructor.getInitialState();
};