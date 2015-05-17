/** @jsx React.DOM */
require('./style.scss');

var React = require('react');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var nameHelper = require('../../lib/nameHelper')('PageCover');
var bitnMixins = require('../../lib/bitnMixins');

var fecha = require('fecha');

module.exports = React.createClass({
  displayName: nameHelper.displayName,
  mixins: bitnMixins,
  propTypes: {
    title: React.PropTypes.node,
    children: React.PropTypes.node,
    date: React.PropTypes.instanceOf(Date)
  },
  getDefaultProps: function () {
    return {
      title: ['Welcome to ', <b key='name'>Pangea</b>],
      children: 'Blockchains, Not Borders'
    };
  },
  componentWillMount: function () {
    this.setState({ mounted: false });
  },
  componentDidMount: function () {
    this.setState({ mounted: true });
  },
  render: function () {
    return (
      <ReactCSSTransitionGroup
        component='div'
        className={nameHelper.className}
        transitionName={nameHelper.state('appear')}
        style={{ height: this.props.height }}>

        {this.state.mounted &&
          <div>
            <div className={nameHelper.ref('welcome')}>
              {this.props.date !== false &&
                <span className={nameHelper.ref('date')}>
                  {fecha.format(this.props.date || new Date(), 'MMMM Do, YYYY')}
                </span>}

              <div className={nameHelper.ref('about')}>
                <h2>{this.props.title}</h2>

                {this.props.children &&
                  <div className={nameHelper.ref('text')}>
                    <span>
                      {this.props.children}
                    </span>
                  </div>}
              </div>
            </div>
          </div>}
      </ReactCSSTransitionGroup>
    );
  },
});