import React, { Component } from "react";
import { parseWork } from "@realsee/five";

/**
 * React HOC 获取 work
 * @param url work.json 的地址
 */
function withFetchWork(url) {
  return function(Compnent) {
    return class extends Component {
      state = { work: null };
      componentDidMount() {
        fetch(url).then(res => res.json()).then(json => {
          this.setState({ work: parseWork(json) });
        });
      }
      render() {
        if (this.state.work === null) return null;
        return <Compnent work={this.state.work} {...this.props}/>;
      }
    }
  }
}

export { withFetchWork };