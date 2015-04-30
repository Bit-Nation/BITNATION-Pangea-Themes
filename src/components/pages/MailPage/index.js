/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var nameHelper = require('../../nameHelper')('MailPage');
var bitnMixins = require('../../mixins/bitnMixins');
var Icon = require('../../controls/Icon');
var Button = require('../../controls/Button');
var PageHeader = require('../../layout/PageHeader');
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
            <PageSection flex={3}>
              "Rich" Eriksson
            </PageSection>

            <PageSection flex={1}>
              Mhmmm
            </PageSection>
          </PageRow>
        </div>

        <div>
          <PageRow>
            <ControlSection flex={1}
              title={[
                'Encrypted mail',
                <Icon key='icon' type='lock' />
              ]}
              controls={[
                <Button key='sendMessage' autoHeight>Send message</Button>,
                <Button key='addContact' autoHeight>Add contact</Button>
              ]}>
              You have not added any contacts.
            </ControlSection>
          </PageRow>
        </div>
      </div>
    );
  }
});