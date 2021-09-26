import React, { Component } from "react";
import { compose } from "@wordpress/compose";
import { createFiveProvider, FiveCanvas } from "@realsee/five/react";
import { withFetchWork } from "./withFetchWork";
import { withWindowDimensions } from "./withWindowDimensions";
import { ModeController } from "./ModeController";
import { LookAroundController } from "./LookAroundController";

/** work.json 的数据 URL */
const workURL = "https://vrlab-public.ljcdn.com/release/static/image/release/five/work-sample/07bdc58f413bc5494f05c7cbb5cbdce4/work.json";

const FiveProvider = createFiveProvider();

const App = compose(
  withFetchWork(workURL),
  withWindowDimensions()
)(class extends Component {
  render() {
    const { work, windowDimensions } = this.props;
    return <FiveProvider initialWork={work}>
      <FiveCanvas width={windowDimensions.width} height={windowDimensions.height}/>
      <ModeController/>;
      <LookAroundController/>;
    </FiveProvider>;
  }
});

export { App };