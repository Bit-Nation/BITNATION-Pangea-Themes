var _ = require('lodash');
var controller = require('../controller');
var uploadMessage = require('../messages/notary/upload');
var verifyTxMessage = require('../messages/notary/verifyTx');

var Bitnation = require('../bitnation/bitnation.pangea');
var ui = new Bitnation.pangea.UI();

controller.on('message', function (message) {
  if (message.type === uploadMessage)
    return upload(message.data.file, message.data.secret, message.data.uri);

  if (message.type === verifyTxMessage)
    return verifyTx(message.data.txId, message.data.secret);
});

function upload (file, secret, uri) {
  ui.notarizeDocument(file, secret, uri)
    .done(function (result) {
      controller.dispatch(uploadMessage.success({
        file: file,
        result: result
      }));
      console.log(result);
      alert('Success: Transaction id is ' + result.txId);
    })
    .fail(function (error) {
      controller.dispatch(uploadMessage.fail({
        file: file,
        error: error
      }));
      alert('An error occurred. Check the logs.');
      console.error(error);
    });
}

function verifyTx (txId, secret) {
  ui.verifyNotary(txId, secret)
    .done(function (result) {
      controller.dispatch(verifyTxMessage.success({
        txId: txId,
        result: result,
        date: new Date()
      }));
    })
    .fail(function (error) {
      controller.dispatch(verifyTxMessage.fail({
        txId: txId,
        error: error,
        date: new Date()
      }));
    });
}