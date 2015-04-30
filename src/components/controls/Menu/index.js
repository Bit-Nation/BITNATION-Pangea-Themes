/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../nameHelper')('Menu');
var wrapImmutables = require('../../wrapImmutables');
var bitnMixins = require('../../mixins/bitnMixins');
var Icon = require('../Icon');
var MenuItem = require('../MenuItem');

var Menu = module.exports = wrapImmutables(React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    className: React.PropTypes.string,
    children: React.PropTypes.node,
    horizontal: React.PropTypes.bool,
    selected: React.PropTypes.arrayOf(React.PropTypes.number),
    items: React.PropTypes.array.isRequired
  },
  render: function () {
    var selected = this.props.selected;
    var clickHandler = this.clickHandler;
    var items = this.props.items.map(function (item, i) {
      var key = item.key === undefined ? i : item.key;
      var isSelected = selected ? selected[0] === key : false;
      return (
        <MenuItem
          prevent={!!item.items}
          {...item}
          key={key} selected={isSelected}
          onClick={clickHandler(key, item)}>

          {item.items &&
            <Menu
              items={item.items}
              selected={isSelected ? selected.slice(1) : null}
              onClick={clickHandler(key, item, true)} />}
        </MenuItem>
      );
    });

    return (
      <nav className={nameHelper.join(
        nameHelper.className,
        this.props.className,
        'pure-menu',
        this.props.horizontal && 'pure-menu-horizontal'
      )}>

        {this.props.children}

        <ul className='pure-menu-list'>
          {items}
        </ul>
      </nav>
    );
  },
  clickHandler: function (key, item, parent) {
    var onClick = this.props.onClick;
    if (!onClick) return;
    return function (keys, childItem) {
      if (parent) onClick([ key ].concat(keys), childItem);
      else onClick([ key ], item);
    };
  }
}));