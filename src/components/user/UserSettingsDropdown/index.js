/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('UserSettingsDropdown');
var bitnMixins = require('../../lib/bitnMixins');
var hoverMixin = require('../../lib/hoverMixin');
var UserAvatar = require('../../user/UserAvatar');
var Menu = require('../../controls/Menu');
var controller = require('../../../controller');

var Bitnation = require('../../../bitnation/bitnation.core');
require('../../../bitnation/bitnation.pangea');

var ui = new Bitnation.pangea.UI();

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins.concat(hoverMixin),
  getInitialState: function() {
    this.getBalance();
    return {
      hzBalance: 0
    };
  },
  render: function () {
    var items = [
      {
        key: 'settings',
        link: 'Settings'
      },
      {
        key: 'test',
        link: 'Test'
      }
    ];

    var className = nameHelper.join(
      nameHelper.className,
      nameHelper.state({ active: false && this.state.hover }));

    return (
      <div className={className}
        onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>

        <div className={nameHelper.ref('toggle')}>
          <span><b>BALANCE: {this.state.hzBalance} HZ</b></span><span>{this.props.currentUser.getIn(['hzAccount', 'accountRS'])}</span>
          <div>
            <UserAvatar size='medium' />
          </div>
        </div>

        <Menu items={items} onClick={this.props.onClick} />
      </div>
    );
  },
  setBalance: function (balance) {
    this.setState({
      hzBalance: isNaN(parseInt(balance)) ? 0 : balance
    });
  },
  getBalance: function () {
    var user = controller.getStore('currentUser');
    ui.getHzAccountBalance(user.getIn(['hzAccount', 'accountRS']))
    .done(this.setBalance)
    .fail(this.setBalance);
  }
});