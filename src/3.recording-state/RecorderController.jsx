import React, { Component } from "react";
import { withFive, createFiveFeature } from "@realsee/five/react";
import { compose } from "@wordpress/compose";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StopIcon from "@mui/icons-material/Stop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Recorder } from "./recorder";

const FEATURES = createFiveFeature("state", "setState", "on", "off");

/**
 * ReactComponent: 状态录制
 */
const RecorderController = compose(
  withFive(FEATURES)
)(class extends Component {

  recorder = new Recorder();
  state = { recording: false, playing: false };

  startRecording = () => {
    this.recorder.startRecording();
    this.setState({ recording: true });
  };

  endRecording = () => {
    this.recorder.endRecording();
    this.setState({ recording: false });
  };

  play = () => {
    const hasRecord = this.recorder.play((state, isFinal) => {
      this.props.$five.setState(state);
      this.setState({playing: !isFinal });
    });
    this.setState({playing: hasRecord });
  };

  record = state => {
    this.recorder.record(state);
  }

  componentDidMount() {
    this.props.$five.on("stateChange", this.record);
  }

  componentWillUnmount() {
    this.props.$five.off("stateChange", this.record);
  }

  render() {
    if (this.state.recording) {
      return <Paper sx={{ position: "fixed", top: 10, left: 10 }}>
        <IconButton onClick={this.endRecording}><StopIcon/></IconButton>
        <Button disabled>录制中</Button>
      </Paper>
    }
    if (this.state.playing) {
      return <Paper sx={{ position: "fixed", top: 10, left: 10 }}>
        <Button disabled>回放中</Button>
      </Paper>
    }
    return <Paper sx={{ position: "fixed", top: 10, left: 10 }}>
      <IconButton onClick={this.startRecording}><FiberManualRecordIcon/></IconButton>
      <IconButton onClick={this.play}><PlayArrowIcon/></IconButton>
    </Paper>;
  }
});

export { RecorderController };