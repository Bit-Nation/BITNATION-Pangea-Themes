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
        <div>
          <PageRow>
            <PageSection flex={1}>
              Dapps
            </PageSection>
          </PageRow>
        </div>
      </div>
    );
  }
});