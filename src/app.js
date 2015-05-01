/** @jsx React.DOM */
require('./components/styles/app.scss');

var React = require('react');
var controller = require('./controller');
var App = require('./components/scenes/App');
var appActions = require('./components/scenes/App/actions');
var initializeMessage = require('./messages/initialize');

controller.registerScene(appActions);
controller.start();
controller.dispatch(initializeMessage());

window.addEventListener('load', function () {
  render();
  controller.data.on('next-animation-frame', render);
});

function render () {
  React.render(
    <App
      cursor={controller.getSceneCursor()}
      stores={controller.getStoreData()}
      dispatch={controller.dispatch} />,

    document.getElementById('app-container')
  );
};