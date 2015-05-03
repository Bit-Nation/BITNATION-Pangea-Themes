/** @jsx React.DOM */
require('./components/styles/app.scss');

var React = require('react');
var controller = require('./controller');
var App = require('./components/scenes/App');
var AppStore = require('./components/scenes/App/Store');
var initializeMessage = require('./messages/initialize');

controller.registerScene(AppStore);
controller.start();
controller.dispatch(initializeMessage());

controller.data.on('next-animation-frame', function () {
  if (controller.dispatcher.isDispatching()) console.log('disp!');
  render();
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