/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('DappsPage');
var bitnMixins = require('../../lib/bitnMixins');
var PageRow = require('../../layout/PageRow');
var PageSection = require('../../layout/PageSection');
var ControlSection = require('../../layout/ControlSection');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  render: function() {
    return (
      <div className={nameHelper.className}>
        <PageRow>
          <PageSection>
            <h2><b>BITNATION</b> Pangea Alpha 0.1.0 <small style={{color: 'rgba(17, 129, 175, 0.8)'}}><b>Decentralized Application (DApp) Library</b></small></h2>
            <p>The Pangea DApp Library for Do-It-Yourself (DIY) Governance DApps and services provides a collaborative environment for both in-house Bitnation DApps, as well as 3rd Party DApps, to develop, buy, sell, share or trade your DIY Governance Apps. Stand by for the developer API and documentation coming shortly.</p>
          </PageSection>
        </PageRow>
        <PageSection>
          <PageRow>
            <div style={{width: '33%'}}>
              <h3 style={{textAlign: 'center'}}>Legal Services</h3>
              <p style={{textAlign: 'center'}}><a href="#!/notary"><b>BITNATION</b> Notary</a></p>
              <p style={{textAlign: 'center'}}><a href="#!/mail"><b>BITNATION</b> Encrypt</a></p>
            </div>

            <div style={{width: '33%'}}>
              <h3 style={{textAlign: 'center'}}>Insurance Services</h3>
              <p style={{textAlign: 'center'}}><a target="_blank" href="http://www.basicincome.co/">Basic Income</a></p>
            </div>

            <div style={{width: '33%'}}>
              <h3 style={{textAlign: 'center'}}>Diplomacy Services</h3>
              <p style={{textAlign: 'center'}}><a target="_blank" href="http://www.bitnation-blog.com/about/"><b>BITNATION</b> Ambassador Network</a></p>
              <p style={{textAlign: 'center'}}><a target="_blank" href="http://www.spacechain.org"><b>BITNATION</b> Space Agency (BSA)</a></p>
            </div>
          </PageRow>
        </PageSection>
        <PageSection flex={1}>
          <h2 style={{textAlign: 'center'}}>Coming Soon</h2>
          <PageRow>
            <p style={{textAlign: 'center', width: '20%'}}><b>BitPassport</b><br />ID & Reputation system</p>
            <p style={{textAlign: 'center', width: '20%'}}><b>BitResolution</b><br />Dispute Resolution</p>
            <p style={{textAlign: 'center', width: '20%'}}><b>BitLand</b><br />Title your land on the blockchain</p>
            <p style={{textAlign: 'center', width: '20%'}}><b>BitMarriage</b><br />Get married on the blockchain<br /></p>
            <p style={{textAlign: 'center', width: '20%'}}><b>BitCorp</b><br />Incorporate your company on the blockchain</p>
          </PageRow>
        </PageSection>
      </div>
    );
  }
});
