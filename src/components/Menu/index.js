/** @jsx React.DOM */
require('./style.scss');

var React = require('react/addons');
var classSet = React.addons.classSet;

var Menu = React.createClass({
  render: function () {
    var items = [];
    for (var i in this.props.items) {
      items.push(
        <MenuItem key={i} value={i}
          active={this.state.active === i} onSelect={this.onSelect}
          {...this.props.items[i]} />
      );
    }

    var className = classSet({
      'bitn-menu': true,
      'pure-menu': true,
      'pure-menu-horizontal': this.props.horizontal,
      'minimized': this.props.minimized
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
      active: this.props.active
    };
  },
  onSelect: function (index) {
    this.setState({
      active: this.state.active === index ? null : index
    });
  }
});

var MenuItem = React.createClass({
  render: function () {
    return (
      <li className={classSet({
        'pure-menu-item': true,
        'active': this.props.active
      })}>
        <a className='pure-menu-link' href={this.props.href || '#'} onClick={this.onClick}>
          
          {this.props.text &&
            <span className='text'>{this.props.text}</span>
          }

          {this.props.icon &&
            <i className={this.props.icon} />
          }
        </a>
        {this.props.items && <Menu items={this.props.items} />}
      </li>
    );
  },
  onClick: function (event) {
    if (this.props.items) event.preventDefault();
    if (this.props.onClick) this.props.onClick();
    if (this.props.onSelect) this.props.onSelect(this.props.value);
  }
});

module.exports = Menu;