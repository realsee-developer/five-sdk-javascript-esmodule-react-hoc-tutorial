import React, { Component } from "react";

/**
 * React HOC: 获取当前窗口的尺寸
 */
function withWindowDimensions() {
  return function(Compnent) {
    return class extends Component {
      state = this.getWindowDimensions();
      resizeListener = () => {
        this.setState(this.getWindowDimensions());
      };
      getWindowDimensions() {
        return { width: window.innerWidth, height: window.innerHeight };
      }
      componentDidMount() {
        window.addEventListener("resize", this.resizeListener, false);
      }
      componentWillUnmount() {
        window.removeEventListener("resize", this.resizeListener, false);
      }
      render() {
        const dimensions = { width: this.state.width, height: this.state.height };
        return <Compnent windowDimensions={dimensions} {...this.props}/>;
      }
    }
  }
}

export { withWindowDimensions };