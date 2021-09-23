import React, { Component } from "react";
import { compose } from "@wordpress/compose";
import { createFiveProvider, FiveCanvas } from "@realsee/five/react";
import { withFetchWork } from "./withFetchWork";
import { withWindowDimensions } from "./withWindowDimensions";

/** work.json 的数据 URL */
const workURL = "https://vrlab-public.ljcdn.com/release/static/image/release/five/work-sample/4e18246c206ba031abf00ee5028920e1/work.json";

const FiveProvider = createFiveProvider();

const App = compose(
  withFetchWork(workURL),
  withWindowDimensions()
)(class extends Component {
  render() {
    const { work, windowDimensions } = this.props;
    return <FiveProvider initialWork={work}>
      <FiveCanvas width={windowDimensions.width} height={windowDimensions.height}/>
    </FiveProvider>;
  }
});

export { App };