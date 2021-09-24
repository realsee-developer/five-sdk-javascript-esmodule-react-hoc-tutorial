import React, { Component } from "react";
import { compose } from "@wordpress/compose";
import { withFive, createFiveFeature } from "@realsee/five/react";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

const FEATURES = createFiveFeature("intersectRaycaster", "on", "off");

const MarkController = compose(
  withFive(FEATURES)
)(class extends Component {

  state = { active: false, marks: [] };

  onTapGesture = (raycaster) => {
    if (this.state.active) {
      const [intersect] = this.props.$five.intersectRaycaster(raycaster);
      if (intersect) this.setState({ marks: this.state.marks.concat(intersect.point) });
      return false;
    }
  };

  componentDidMount() {
    this.props.$five.on("wantsTapGesture", this.onTapGesture);
  }
  componentWillUnmount() {
    this.props.$five.off("wantsTapGesture", this.onTapGesture);
  }
  render() {
    return <Paper sx={{ position: "fixed", top: 10, left: 10, padding: 1 }}>
      <Stack>
        <Stack direction="row">
          <Switch
            checked={this.state.active}
            onChange={(event, checked) => this.setState({ active: checked })}
          /> <Button disabled>开启点击记录坐标</Button>
        </Stack>
        <Stack spacing={1}>
        {this.state.marks.map((point, index) => {
          const { x, y, z } = point;
          return <Chip
            key={index}
            label={`x=${x.toFixed(2)} y=${y.toFixed(2)} z=${z.toFixed(2)}`}
            onDelete={() => this.setState({marks: this.state.marks.filter((_, index_) => index_ !== index)})}
          />
        })}
        </Stack>
      </Stack>
    </Paper>
  }
});

export { MarkController };