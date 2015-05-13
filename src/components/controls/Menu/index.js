/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('Menu');
var wrapImmutables = require('../../lib/wrapImmutables');
var bitnMixins = require('../../lib/bitnMixins');
var Icon = require('../Icon');
var MenuItem = require('../MenuItem');

var Menu = module.exports = wrapImmutables(React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    className: React.PropTypes.string,
    style: React.PropTypes.object,
    listStyle: React.PropTypes.object,
    itemStyle: React.PropTypes.object,
    linkStyle: React.PropTypes.object,
    iconStyle: React.PropTypes.object,
    child: React.PropTypes.object,
    children: React.PropTypes.node,
    horizontal: React.PropTypes.bool,
    selected: React.PropTypes.arrayOf(React.PropTypes.number),
    items: React.PropTypes.array.isRequired
  },
  render: function () {
    var props = this.props;
    var selected = props.selected;
    var clickHandler = this.clickHandler;

    var items = this.props.items.map(function (item, i) {
      var key = item.key === undefined ? i : item.key;
      var isSelected = selected ? selected[0] === key : false;
      return (
        <MenuItem
          prevent={!!item.items}
          style={props.itemStyle}
          linkStyle={props.linkStyle}
          iconStyle={props.iconStyle}
          {...item}
          key={key} selected={isSelected}
          onClick={clickHandler(key, item)}>

          {item.items &&
            <Menu
              {...(props.child || props)}
              items={item.items}
              selected={isSelected ? selected.slice(1) : null}
              onClick={clickHandler(key)} />}
        </MenuItem>
      );
    });

    return (
      <nav className={nameHelper.join(
        nameHelper.className,
        props.className,
        'pure-menu',
        this.props.horizontal && 'pure-menu-horizontal'
      )} style={props.style}>

        {props.children}

        <ul className='pure-menu-list' style={props.listStyle}>
          {items}
        </ul>
      </nav>
    );
  },
  clickHandler: function (key, item) {
    var current = this.props.selected;
    var onClick = this.props.onClick;
    var onSelect = this.props.onSelect;
    return function (clickedKeys, clickedItem) {
      if (!item) {
        clickedKeys = [ key ].concat(clickedKeys);
      }
      else {
        clickedKeys = [ key ];
        clickedItem = item;
      }

      if (onClick) onClick(clickedKeys, clickedItem);
      if (!onSelect) return;

      // select the parent if the keys are
      // equal or directly descending to the currently selected item
      // -- this closes stuff
      var selected = clickedKeys;
      if (current && current.length >= clickedKeys.length &&
        _.isEqual(clickedKeys, current.slice(0, clickedKeys.length)))
        selected = selected.length > 1 ? selected.slice(0, -1) : null;

      onSelect(selected);
    };
  }
}));