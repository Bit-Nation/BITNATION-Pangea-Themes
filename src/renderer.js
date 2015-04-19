var React = require('react');
var queryString = require('query-string');

var render = function (component) {
  React.render(component, document.getElementById('app-container'));
};

// run examples by going to
// http://localhost:8080/webpack-dev-server/?example=ComponentName
// component needs to have an example handler
// that handler needs to be required in entry

var params = queryString.parse(window.location.search);
if (params.example) {
  window.addEventListener('load', function () {
    var handler = require('./' + params.example + '/example');
    if (handler.length < 2) render(handler(params));
    else handler(params, render);
  });
}