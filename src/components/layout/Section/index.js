/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');

var Section = React.createClass({
  mixins: [ bitnMixin ],
  propTypes: {
    className: React.PropTypes.string,
    flex: React.PropTypes.number,
    title: React.PropTypes.string,
    header: React.PropTypes.any,
    footer: React.PropTypes.any
  },
  render: function () {
    var className = this.className();
    if (this.props.className) className += ' ' + this.props.className;
    if (this.props.flex) className += ' flex flex-' + this.props.flex;
    if (this.props.header) className += ' has-header';
    if (this.props.children) className += ' has-body';
    if (this.props.footer) className += ' has-footer';

    return (
      <section className={className}>
        {(this.props.title || this.props.header) &&
          <header>
            {this.props.title &&
              <h2>{this.props.title}</h2>}

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

module.exports = Section;