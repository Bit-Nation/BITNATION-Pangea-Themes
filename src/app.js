/** @jsx React.DOM */
require('./components/styles/app.scss');

var React = require('react');
var controller = require('./controller');
var App = require('./components/scenes/App');
var initializeMessage = require('./messages/initialize');

controller.dispatch(initializeMessage());

controller.addScene('app');
controller.on('render', function () {
  if (controller.isDispatching()) console.log('disp!');
  render();

});

function render () {
  React.render(
    <App
      cursor={controller.getScene('app')}
      stores={controller.getStores()}
      dispatch={controller.dispatch} />,

    document.getElementById('app-container')
  );
};