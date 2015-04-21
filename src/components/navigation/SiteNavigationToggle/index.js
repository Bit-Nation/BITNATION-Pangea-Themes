/** @jsx React.DOM */
require('./style.scss');

var React = require('react/addons');
var component = require('../../component');

var hoverMixin = require('../../mixins/hoverMixin');

module.exports = component('SiteNavigationToggle', {
  mixins: [ hoverMixin ],
  render: function () {
    var url = this.props.url;
    var content = this.props.paths.map(function (id) {
      return '<use width="40" class="' + id + '" xlink:href="' + url + '#' + id + '" />';
    }).join('');

    var className = this.className();
    if (this.props.className) className += ' ' + className;

    return (
      <div className={className}
        onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
        <svg width='100%' height='100%' viewBox={this.props.viewBox}
          dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  },
  getDefaultProps: function () {
    return {
      url: '/images/logoPath.svg',
      viewBox: '0 0 176.9 191.1',
      paths: ['text', 'outer-circle', 'inner-circle', 'chain', 'lines']
    };
  }
});