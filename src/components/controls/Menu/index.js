/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var component = require('../../component');

var hoverMixin = require('../../mixins/hoverMixin');
var Icon = require('../Icon');

var Menu = module.exports = component('Menu', {
  propTypes: {
    className: React.PropTypes.string,
    horizontal: React.PropTypes.bool,
    items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  },
  getInitialState: function () {
    return {
      selected: this.props.selected
    };
  },
  render: function () {
    var items = [];
    for (var i in this.props.items) {
      items.push(
        <MenuItem key={i} {...this.props.items[i]}
          value={i} selected={this.state.selected === i} onClick={this.onClick} />
      );
    }

    var className = this.className() + ' pure-menu';
    if (this.props.horizontal) className += ' pure-menu-horizontal';
    if (this.props.className) className += ' ' + this.props.className;

    return (
      <nav className={className}>
        {this.props.children}

        <ul className='pure-menu-list'>
          {items}
        </ul>
      </nav>
    );
  },
  componentWillReceiveProps: function (props) {
    if (props.selected === this.props.selected ||
        props.selected == null) return;
    this.setState({ selected: props.selected });
  },
  onClick: function (index) {
    var current = this.state.selected === index;

    this.setState({ selected: current ? null : index });

    var item = this.props.items[index];
    if (item.onClick) item.onClick(item.value);
    if (this.props.onClick) this.props.onClick(item.value);

    if (current) return;
    if (item.onSelect) item.onSelect(item.value);
    if (this.props.onSelect) this.props.onSelect(item.value);
  }
});

var MenuItem = component('MenuItem', {
  mixins: [ hoverMixin ],
  render: function () {
    var icon;
    if (typeof this.props.icon == 'string') icon = { type: this.props.icon };
    else if (this.props.icon) icon = this.props.icon;
    
    var className = 'pure-menu-item';
    if (this.props.selected) className += ' selected';
    if (this.props.items) className += ' has-children';

    return (
      <li className={className}>
        <a className='pure-menu-link' href={this.props.href || '#'}
          onClick={this.onClick}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}>
          
          {this.props.content &&
            <span>{this.props.content}</span>}

          {icon &&
            <Icon highlight={this.state.hover} {...icon} />}
        </a>
        {this.props.items && <Menu items={this.props.items} />}
      </li>
    );
  },
  onClick: function (event) {
    if (this.props.items || this.props.href == null) event.preventDefault();
    if (this.props.onClick) this.props.onClick(this.props.value);
  }
});