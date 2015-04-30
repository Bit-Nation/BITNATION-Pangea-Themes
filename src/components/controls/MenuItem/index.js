/** @jsx React.DOM */
require('./style.scss');

// this should, at this point, only be used through Menu

var React = require('react');
var nameHelper = require('../../nameHelper')('MenuItem');
var bitnMixins = require('../../mixins/bitnMixins');
var hoverMixin = require('../../mixins/hoverMixin');
var Icon = require('../Icon');
var Link = require('../Link');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins.concat(hoverMixin),
  propTypes: {
    className: React.PropTypes.string,
    children: React.PropTypes.node,
    selected: React.PropTypes.bool,
    href: React.PropTypes.string,
    link: React.PropTypes.node,
    icon: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]),
    prevent: React.PropTypes.bool,
    onClick: React.PropTypes.func
  },
  render: function () {
    var icon;
    if (typeof this.props.icon == 'string') icon = { type: this.props.icon };
    else if (this.props.icon) icon = this.props.icon;
    
    var className = nameHelper.join(
      nameHelper.className,
      this.props.className,
      nameHelper.state({
        selected: this.props.selected,
        hasChildren: this.props.children,
        linkHover: this.state.hover
      }),
      'pure-menu-item');
    
    return (
      <li className={className}>
        {(this.props.link || this.props.href || icon) &&
          <Link className='pure-menu-link' href={this.props.href || '#'}
            onClick={this.onClick}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}>
            
            {this.props.link &&
              <span>{this.props.link}</span>}

            {icon &&
              <Icon highlight={this.state.hover} {...icon} />}
          </Link>}

        {this.props.children &&
          <div>
            {this.props.children}
          </div>}
      </li>
    );
  },
  onClick: function (event) {
    if (this.props.prevent || this.props.href == null)
      event.preventDefault();

    if (this.props.onClick) this.props.onClick();
  }
});