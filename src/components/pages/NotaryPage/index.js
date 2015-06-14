/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('NotaryPage');
var bitnMixins = require('../../lib/bitnMixins');
var Search = require('../../controls/Search');
var Table = require('../../controls/Table');
var NotaryUpload = require('../../notary/NotaryUpload');
var NotaryTxVerifier = require('../../notary/NotaryTxVerifier');

var PageHeader = require('../../layout/PageHeader');
var PageRow = require('../../layout/PageRow');
var PageSection = require('../../layout/PageSection');
var Results = require('../../layout/Results');

var _ = require('lodash');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    cursor: React.PropTypes.object.isRequired,
    notary: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  },
  render: function() {
    var cursor = this.props.cursor;
    var notary = this.props.notary;
    var dispatch = this.props.dispatch;

    return (
      <div className={nameHelper.className}>
        <PageHeader title='Public Notary' />

        <div>
          <PageRow>
            <PageSection flex={3}>
              <NotaryUpload
                cursor={cursor.cursor('upload')}
                uploads={notary.get('uploads')}
                dispatch={dispatch} />
            </PageSection>

            <PageSection flex={1} title='Get started'>
              <NotaryTxVerifier
                cursor={cursor.cursor('txVerifier')}
                verified={notary.getIn(['tx', 'verified'])}
                dispatch={dispatch} />
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
  }
});
