var _ = require('lodash');
var controller = require('../controller');
var initializeMessage = require('../messages/initialize');
var scrollMessage = require('../messages/scroll');

controller.on('message', function (message) {
  if (message.type === initializeMessage)
    return initialize();

  if (message.type === scrollMessage)
    return scrollTo(message.data.left, message.data.top);
});

function initialize () {
  window.addEventListener('scroll', onScroll);
  onScroll();
}

function onScroll () {
  controller.dispatch(scrollMessage.success({
    left: getScrollLeft(),
    top: getScrollTop()
  }));
}

function scrollTo (left, top) {
  if (left == null) left = getScrollLeft();
  if (top == null) top = getScrollTop();
  window.scrollTo(left, top);
}

function getScrollLeft () {
  return window.pageXOffset || document.documentElement.scrollLeft;
}

function getScrollTop () {
  return window.pageYOffset || document.documentElement.scrollTop;
}