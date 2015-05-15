/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('DashboardPage');
var bitnMixins = require('../../lib/bitnMixins');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    cursor: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <div className={nameHelper.className}>
        <h1>Bitnation Pangea</h1>
        <p>Bitnation Pangea is the world&#39;s first blockchain powered Virtual Nation. Bitnation Pangea is a collaborative platform for Do-It-Yourself Governance, providing all services traditional governments provides. The backbone of the platform consist of the ID and Reputation System (The BITNATION Passport), the Dispute Resolution System, the Public Notary and a DIY Governance (D)App Library where others can create, upload, share or sell their own Governance (D)Apps.</p>
        <p>Additional services includes Marriage, Wills, Childcare Contracts, Birth Certificates, Land Titles, Corporate Incorporation and Equity Trade, Unemployment Insurance, Pensions, Health Care Insurance, Security, and Diplomacy.</p>
      </div>
    );
  }
});