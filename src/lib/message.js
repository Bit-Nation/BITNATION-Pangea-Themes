/*

  creates a unique message factory

  add child messages to the factory with factory.message
  the childs full typeName will be parent_child
  factory.asyncMessages() adds success, fail, cancel

  example definition
  var disconnectMainframe =
    message('disconnectMainframe', function (a, b, c) { return a - b + c; })

  disconnectMainframe.hardlineFail =
    message(disconnectMainframe, 'hardlineFail');
  
  example use
  dispatch(disconnectMainframe(16, 23, 42));
  dispatch(disconnectMainframe.hardlineFail());
*/

module.exports = function (parent, typeName, handler) {
  if (typeof parent == 'string') {
    handler = typeName;
    typeName = parent;
    parent = null;
  }

  var resultName = typeName;
  if (parent) resultName = parent.typeName + '_' + resultName; 

  var result = function messageFactory (data) {
    if (handler === false) data = null;
    if (handler) data = handler.apply(null, arguments);

    return {
      typeName: resultName,
      type: messageFactory,
      data: data
    };
  };

  result.typeName = resultName;

  return result;
};