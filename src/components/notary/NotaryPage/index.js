/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');

var Table = require('../../controls/Table');
var SearchInput = require('../../controls/SearchInput');

var NotaryUpload = require('../../notary/NotaryUpload');
var NotaryTxVerifier = require('../../notary/NotaryTxVerifier');

var NotaryPage = React.createClass({
  mixins: [ bitnMixin ],
  render: function() {
    return (
      <div className={this.className()}>
        <h2>Public notary</h2>

        <div className='row'>
          <NotaryUpload />
          <NotaryTxVerifier />
        </div>

        <div className='row'>
          <div>
            <h3>Your latest registered documents:</h3>

            <Table head={['Document digest', 'Timestamp']}
              body={[
                ['34444GDE6M912323', '232F047E6M932'],
                ['F04GDE6M9', '23F04GDE6M9232']
              ]} />
          </div>

          <div>
            Woohoos
          </div>
        </div>

        <div className='row'>
          <div>
            <h3>Search for public documents</h3>

            <SearchInput />

            <Table head={['Document digest', 'Timestamp']}
              body={[
                ['34444GDE6M912323', '232F047E6M932'],
                ['F04GDE6M9', '23F04GDE6M9232']
              ]} />
          </div>
          <div>
            <h3>Template library</h3>

            <SearchInput />

            <Table head={['Document digest', 'Timestamp']}
              body={[
                ['34444GDE6M912323', '232F047E6M932'],
                ['F04GDE6M9', '23F04GDE6M9232']
              ]} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = NotaryPage;