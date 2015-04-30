/** @jsx React.DOM */
require('./components/app.scss');

var React = require('react');
var App = require('./components/scenes/App');

var dispatch = require('./dispatcher').dispatch;
var data = require('./data');
var stores = require('./stores');

var initializeMessage = require('./messages/initialize');

dispatch(initializeMessage());

window.addEventListener('load', function () {
  render();
  data.on('next-animation-frame', render);
});

function render () {
  React.render(
    <App
      cursor={data.cursor('scene')}
      stores={stores.data()}
      dispatch={dispatch} />,
      
    document.getElementById('app-container')
  );
};