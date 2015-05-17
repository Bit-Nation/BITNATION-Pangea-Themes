/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../lib/nameHelper')('NotFoundPage');
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
          <PageSection>
            <h1>&ldquo;All that is gold does not glitter,</h1>
            <h1>Not all those who wander are lost;&rdquo;</h1>
            <h2>But I think you are... This page doesn&lsquo;t exist</h2>
          </PageSection>
        </PageRow>
      </div>
    );
  }
});