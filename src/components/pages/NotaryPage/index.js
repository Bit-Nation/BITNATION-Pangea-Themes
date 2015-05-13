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
var PageSection = require('../../layout/PageSection');
var Results = require('../../layout/Results');

var Bitnation = require('../../../bitnation/bitnation.pangea');

var NotaryPage = React.createClass({
  mixins: [ bitnMixin ],
  render: function() {
    return (
      <div className={this.className()}>
        <PageHeader title='Public notary' />

        <div>
          <PageRow>
            <PageSection flex={3}>
              <NotaryFileInput
                public={this.state.public} uri={this.state.uri}
                secret={this.state.secret}
                onPublic={this.onPublic} onUri={this.onUri} 
                onSecret={this.onSecret} onFiles={this.onFiles} />
            </PageSection>

            <PageSection flex={1} title='Get started'>
              <NotaryTxVerifier />
            </PageSection>
          </PageRow>

          <PageRow>
            <PageSection flex={3}>
              <Results title='Your latest registered documents'>
                <Table head={['Document digest', 'Timestamp']}
                  body={[
                    ['34444GDE6M912323', '232F047E6M932'],
                    ['F04GDE6M9', '23F04GDE6M9232']
                  ]} />
              </Results>
            </PageSection>

            <PageSection flex={1}>
              <img src='/images/logo.png' style={{
                display: 'block',
                width: '100%',
                WebkitFilter: 'invert(0.7)'
              }} />
            </PageSection>
          </PageRow>

          <PageRow>
            <PageSection flex={1} title='Search for public documents'>
              <Search />

              <Results title='Search results'>
                <Table head={['Document digest', 'Timestamp']}
                  body={[
                    ['34444GDE6M912323', '232F047E6M932'],
                    ['F04GDE6M9', '23F04GDE6M9232']
                  ]} />
              </Results>
            </PageSection>

            <PageSection flex={1} title='Template library'>
              <Search />

              <Results title='Search results'>
                <Table head={['Document digest', 'Timestamp']}
                  body={[
                    ['34444GDE6M912323', '232F047E6M932'],
                    ['F04GDE6M9', '23F04GDE6M9232']
                  ]} />
              </Results>
            </PageSection>
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

    var ui = new Bitnation.pangea.UI();

    ui.notarizeDocument(
      file, this.state.secret, this.state.uri, !this.state.public
    ) .done(function (result) {

        console.log(result);
        alert('Success: Transaction id is ' + result.txId);

      })
      .fail(function (err) {

        console.error(err);
        alert('An error occurred. Check the logs.');

      });

    this.setState({ secret: '' });
  }
});

module.exports = NotaryPage;