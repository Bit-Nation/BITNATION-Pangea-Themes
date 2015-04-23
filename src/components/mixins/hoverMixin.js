module.exports = {
  getInitialState: function () {
    return {
      hover: false
    }
  },
  onMouseOver: function (event) {
    this.setState({ hover: true });
    if (this.props.onMouseOver) this.props.onMouseOver(event);
  },
  onMouseOut: function (event) {
    this.setState({ hover: false });
    if (this.props.onMouseOut) this.props.onMouseOut(event);
  }
};