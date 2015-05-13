/*

  Store abstract class
  
  methods are accessible as is from constructor
  they are also accesible from instances, but
  the first arg is bound to the local data value

  the data is indented to be an immutable js type
  and the responding to be done in a dispatcher handler

  methods in Store.updaters are wrapped in a call to
  the update method on the first argument. this makes
  methods only trigger one change and is often preferred

  example use

  var MessageStore = Store.extend({
    getInitialState: function () {
      return Immutable.List();
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
  
  // instances should be made from values, not cursors
  var store = new MessageStore(data);

  // these are equal
  store.getUnread(true);
  MessageStore.getUnread(data, true);
  
  // these are also equal  
  cursor =
    MessageStore.updaters.setUnread(cursor, unreadList);
  cursor = cursor.update(
    _.partial(MessageStore.setUnread, _, unreadList));
*/

var _ = require('lodash');
var util = require('util');
var Immutable = require('immutable');

var Proto = function Store (data) {};

Proto.extend = function (options) {
  var constructor = function Store (data) {
    if (!(this instanceof Store)) return new Store(data);
    this.data = data;
  };

  util.inherits(constructor, this);
  var methods = _.extend(_.clone(this.methods || {}), options || {});
  var updaters = {};

  _.each(methods, function (fn, key) {
    var handler = constructor[key] = fn.bind(constructor);
    if (fn.length == 0) constructor.prototype[key] = handler;
    else { 
      // create handlers wrappped in a update
      updaters[key] = function (data, args__) {
        var args = [];
        for (var i = 1; i < arguments.length; i++)
          args[i-1] = arguments[i];

        return data.update(function (data) {
          return handler.apply(null, [ data ].concat(args));
        });
      };

      // create instance getters
      constructor.prototype[key] = function (args__) {
        var args = [];
        for (var i = 0; i < arguments.length; i++)
          args[i] = arguments[i];

        return handler.apply(null, [ this.data ].concat(args));
      };
    }
  });

  constructor.methods = methods;
  constructor.updaters = updaters;
  constructor.extend = this.extend;

  return constructor;
};

module.exports = Proto.extend({
  getInitialState: function () {
    return Immutable.Map();
  },
  getSaveData: function (data) {
    return data.toJS();
  },
  getLoadedState: function (data, saveData) {
    return data.mergeDeep(saveData);
  },
  get: function (data, key) {
    return data.get(key);
  },
  getIn: function (data, keys) {
    return data.getIn(keys);
  }
})