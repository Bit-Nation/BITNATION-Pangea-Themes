/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var bitnMixin = require('../../mixins/bitnMixin');
var Icon = require('../../controls/Icon');
var Button = require('../../controls/Button');
var PageHeader = require('../../layout/PageHeader');
var PageRow = require('../../layout/PageRow');
var PageSection = require('../../layout/PageSection');
var ControlSection = require('../../layout/ControlSection');

var MailPage = React.createClass({
  mixins: [ bitnMixin ],
  render: function() {
    return (
      <div className={this.className()}>
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
                <Icon type='lock' />
              ]}
              controls={[
                <Button autoHeight>Send message</Button>,
                <Button autoHeight>Add contact</Button>
              ]}>
              You have not added any contacts.
            </ControlSection>
          </PageRow>
        </div>
      </div>
    );
  }
});

module.exports = MailPage;