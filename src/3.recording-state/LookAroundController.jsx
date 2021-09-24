import React, { Component } from "react";
import { withFive, createFiveFeature } from "@realsee/five/react";
import { compose } from "@wordpress/compose";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import PauseIcon from "@mui/icons-material/Pause";

const FEATURES = createFiveFeature("currentState", "setState");

/**
 * ReactComponent: 自动环视按钮
 */
const LookAroundController = compose(
  withFive(FEATURES)
)(class extends Component {

  timer;
  state = { active: false };

  toggleActive(active) {
    window.clearInterval(this.timer);
    this.setState({ active });
    if (active === true) {
      this.timer = window.setInterval(() => {
        this.props.$five.setState({
          longitude: this.props.$five.currentState.longitude + Math.PI / 360
        });
      }, 16);
    } else {
      delete this.timer;
    }
  }
  render() {
    return <Paper sx={{ position: "fixed", top: 10, right: 10 }}>
    {this.state.active ?
      <IconButton onClick={() => this.toggleActive(false)}><PauseIcon/></IconButton>:
      <IconButton onClick={() => this.toggleActive(true)}><FlipCameraAndroidIcon/></IconButton>
    }
    </Paper>;
  }
});

export { LookAroundController };