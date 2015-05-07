var controller = require('../controller');
var initializeMessage = require('../messages/initialize');
var uploadMessage = require('../messages/notary/upload');
var verifyTxMessage = require('../messages/notary/verifyTx');

var defaults = {
  tx: {
    verified: {}
  },
  uploads: {

  }
};

controller.addStore('notary', function (data, message, waitFor) {
  if (message.type === initializeMessage)
    return data.mergeDeep(defaults);

  if (message.type === verifyTxMessage.success)
    return updateVerifiedTx(data, message.data);
});

function updateVerifiedTx (data, response) {
  return data.setIn(['tx', 'verified', response.hash],
    Immutable.Map({
      valid: response.valid,
      date: response.date
    })
  );
}