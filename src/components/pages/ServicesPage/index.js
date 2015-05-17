/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('ServicesPage');
var bitnMixins = require('../../lib/bitnMixins');
var PageRow = require('../../layout/PageRow');
var PageSection = require('../../layout/PageSection');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  render: function() {
    return (
      <div className={nameHelper.className}>
        <PageRow>
          <PageSection title='Services'>
          </PageSection>
        </PageRow>

        <PageRow>
          <PageSection flex={1}>
            <h3>LAW</h3>
            ID System | Dispute Resolution | Marriage & Divorce | Corporate Incorporation | Land Titles | Birth & Death CertifIcates | Childcare Contracts

            <h3>DIY NATION</h3>
            Build Your Own Nation

            <h3>DIPLOMACY</h3>
            Advocacy | Crisis Negotiations | Space Exploration
          </PageSection>


          <PageSection flex={1}>
            <h3>INSURANCE</h3>
            HealthCare | Unemployment | Pensions | Basic Income

            <h3>SOCIAL SERVICES</h3>
            Education | Community Management

            <h3>SECURITY</h3>
            Peer-To-Peer Protection | Individual Security | Contract Enforcement
          </PageSection>
        </PageRow>
      </div>
    );
  }
});