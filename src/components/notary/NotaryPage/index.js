/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');
var Search = require('../../controls/Search');
var Table = require('../../controls/Table');
var NotaryFileInput = require('../../notary/NotaryFileInput');
var NotaryTxVerifier = require('../../notary/NotaryTxVerifier');

var PageHeader = require('../../layout/PageHeader');
var PageRow = require('../../layout/PageRow');
var Section = require('../../layout/Section');

var Bitnation = require('../../../bitnation/bitnation.pangea');

var NotaryPage = React.createClass({
  mixins: [ bitnMixin ],
  render: function() {
    return (
      <div className={this.className()}>
        <PageHeader title='Public notary' />

        <div>
          <PageRow>
            <Section flex={3}>
              <NotaryFileInput
                public={this.state.public} uri={this.state.uri}
                secret={this.state.secret}
                onPublic={this.onPublic} onUri={this.onUri} 
                onSecret={this.onSecret} onFiles={this.onFiles} />
            </Section>

            <Section flex={1}>
              <NotaryTxVerifier />
            </Section>
          </PageRow>

          <PageRow>
            <Section flex={3} title='Your latest registered documents'>
              <Table head={['Document digest', 'Timestamp']}
                body={[
                  ['34444GDE6M912323', '232F047E6M932'],
                  ['F04GDE6M9', '23F04GDE6M9232']
                ]} />
            </Section>

            <Section flex={1}>
              Woohoos
            </Section>
          </PageRow>

          <PageRow>
            <Section flex={1} title='Search for public documents'>
              <Search />

              <Table head={['Document digest', 'Timestamp']}
                body={[
                  ['34444GDE6M912323', '232F047E6M932'],
                  ['F04GDE6M9', '23F04GDE6M9232']
                ]} />
            </Section>

            <Section flex={1} title='Template library'>
              <Search />

              <Table head={['Document digest', 'Timestamp']}
                body={[
                  ['34444GDE6M912323', '232F047E6M932'],
                  ['F04GDE6M9', '23F04GDE6M9232']
                ]} />
            </Section>
          </PageRow>
        </div>
      </div>
    );
  },
  onPublic: function (value) {
    this.setState({ public: value });
  },
  onUri: function (value) {
    this.setState({ uri: value });
  },
  onSecret: function (value) {
    this.setState({ secret: value });
  },
  onFiles: function (files) {
    this.issueNotary(files[0]);
  },
  issueNotary: function (file) {

    // @todo: Encrypted (private) notaries

    var ui = new Bitnation.pangea.UI();

    ui.notarizeDocument(file, this.state.secret, this.state.uri)
      .done(function (result) {

        console.log(result);
        alert('Success: Transaction id is ' + result.txId);

      })
      .fail(function (err) {

        alert('An error occurred. Check the logs.');
        console.error(err);

      });

    this.setState({ secret: '' });
  }
});

module.exports = NotaryPage;