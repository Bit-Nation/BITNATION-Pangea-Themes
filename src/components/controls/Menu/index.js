/** @jsx React.DOM */
require('./style.scss');

var React = require('react/addons');
var classSet = React.addons.classSet;

var hoverMixin = require('../../mixins/hover');
var Icon = require('../Icon');

var Menu = React.createClass({
  render: function () {
    var items = [];
    for (var i in this.props.items) {
      items.push(
        <MenuItem key={i} {...this.props.items[i]}
          value={i} selected={this.state.selected === i} onClick={this.onClick} />
      );
    }

    var className = classSet({
      'bitn-menu': true,
      'pure-menu': true,
      'pure-menu-horizontal': this.props.horizontal
    });
    if (this.props.className) className += ' ' + this.props.className;

    return (
      <nav className={className}>
        <ul className='pure-menu-list'>
          {items}
        </ul>
      </nav>
    );
  },
  getInitialState: function () {
    return {
      selected: this.props.selected
    };
  },
  onClick: function (index) {
    this.setState({
      selected: this.state.selected === index ? null : index
    });

    var item = this.props.items[index];
    if (item.onClick) item.onClick(item.value);
  }
});

var MenuItem = React.createClass({
  mixins: [ hoverMixin ],
  render: function () {
    var icon;
    if (typeof this.props.icon == 'string') icon = { type: this.props.icon };
    else if (this.props.icon) icon = this.props.icon;

    return (
      <li className={classSet({
        'pure-menu-item': true,
        'selected': this.props.selected,
        'has-children': this.props.items
      })}>
        <a className='pure-menu-link' href={this.props.href || '#'}
          onClick={this.onClick} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
          
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
    if (this.props.items) event.preventDefault();
    if (this.props.onClick) this.props.onClick(this.props.value);
  }
});

module.exports = Menu;