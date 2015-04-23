module.exports = {
  getInitialState: function () {
    return {
      focus: false
    }
  },
  onFocus: function (event) {
    this.setState({ focus: true });
    if (this.props.onFocus) this.props.onFocus(event);
  },
  onBlur: function (event) {
    this.setState({ focus: false });
    if (this.props.onBlur) this.props.onBlur(event);
  }
};