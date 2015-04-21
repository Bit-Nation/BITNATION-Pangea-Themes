module.exports = {
  getInitialState: function () {
    return {
      focus: false
    }
  },
  onFocus: function () {
    this.setState({ focus: true });
  },
  onBlur: function () {
    this.setState({ focus: false });
  }
};