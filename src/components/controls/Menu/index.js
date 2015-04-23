/** @jsx React.DOM */
require('./style.scss');

// this is fat and should be split up

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');
var hoverMixin = require('../../mixins/hoverMixin');
var Icon = require('../Icon');

var Menu = React.createClass({
  mixins: [ bitnMixin ],
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
  componentWillReceiveProps: function (props) {
    if (props.selected === this.props.selected ||
        props.selected == null) return;
    this.setState({ selected: props.selected });
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

module.exports = Menu;

var MenuItem = React.createClass({
  mixins: [ hoverMixin ],
  render: function () {
    var icon;
    if (typeof this.props.icon == 'string') icon = { type: this.props.icon };
    else if (this.props.icon) icon = this.props.icon;
    
    var className = 'pure-menu-item';
    if (this.props.selected) className += ' ' + Menu.stateName('selected');
    if (this.props.items) className += ' ' + Menu.stateName('hasChildren');

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

        {this.props.items &&
          <Menu items={this.props.items}
            selected={this.props.selected ? null : false}/>}
      </li>
    );
  },
  onClick: function (event) {
    if (this.props.items || this.props.href == null) event.preventDefault();
    if (this.props.onClick) this.props.onClick(this.props.value);
  }
});