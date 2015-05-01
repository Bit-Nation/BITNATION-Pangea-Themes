var NameHelper = require('./NameHelper');

module.exports = function (displayName) {
  return new NameHelper('bitn', displayName);
};