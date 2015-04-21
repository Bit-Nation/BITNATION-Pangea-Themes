var _ = require('lodash');
var React = require('react/addons');
var cloneWithProps = React.addons.cloneWithProps;

module.exports = {
  cloneChildren: function cloneChildren (props, start, end) {
    var children = this.props.children;
    if (typeof children != 'object') return children;

    if (_.isArray(children)) {
      if (arguments.length > 2)
        children = children.slice(start, end);
      else if (arguments.length > 1)
        children = children.slice(start);
      return children.map(function (child) {
        if (!child || typeof child != 'object') return child;
        return cloneWithProps(child, props);
      });
    };

    return cloneWithProps(children, props);
  }
};