/** @jsx React.DOM */
require('./style.scss');

// NOT USEFUL FOR ANYTHING YET
// some something magic later
// - olfox

var React = require('react');
var nameHelper = require('../../nameHelper')('SiteNavigationToggle');
var bitnMixins = require('../../mixins/bitnMixins');
var hoverMixin = require('../../mixins/hoverMixin');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins.concat(hoverMixin),
  render: function () {
    var url = this.props.url;
    var hover = this.state.hover;
    var content = this.props.paths.map(function (id) {
      return '<use class="' + id + '" xlink:href="' + url + '#' + id + '" />';
    }).join('');

    return (
      <div className={4444}
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