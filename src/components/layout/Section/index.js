/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('Section');
var bitnMixins = require('../../lib/bitnMixins');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    className: React.PropTypes.string,
    children: React.PropTypes.node,
    titleTag: React.PropTypes.string,
    flex: React.PropTypes.number,
    title: React.PropTypes.node,
    header: React.PropTypes.node,
    footer: React.PropTypes.node
  },
  render: function () {
    var Title = this.props.titleTag || 'h2';

    var className = nameHelper.join(
      nameHelper.className,
      this.props.className,
      nameHelper.state({
        flex: this.props.flex,
        header: this.props.header,
        body: this.props.children,
        footer: this.props.footer
      }),
      this.props.flex &&
        nameHelper.state('flex-' + this.props.flex)
    );

    return (
      <section className={className}>
        {(this.props.title || this.props.header) &&
          <header>
            {this.props.title &&
              <Title>{this.props.title}</Title>}

            {this.props.header}
          </header>}

        {this.props.children &&
          <div>
            {this.props.children}
          </div>}

        {this.props.footer &&
          <footer>
            {this.props.footer}
          </footer>}
      </section>
    );
  }
});