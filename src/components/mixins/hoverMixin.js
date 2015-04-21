module.exports = {
  getInitialState: function () {
    return {
      hover: false
    }
  },
  onMouseOver: function () {
    this.setState({ hover: true });
  },
  onMouseOut: function () {
    this.setState({ hover: false });
  }
};