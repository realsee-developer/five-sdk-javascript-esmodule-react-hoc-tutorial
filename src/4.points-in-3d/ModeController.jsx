import React, { Component } from "react";
import { Five } from "@realsee/five";
import { withFive, createFiveFeature } from "@realsee/five/react";
import { compose } from "@wordpress/compose";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import ViewInArIcon from "@mui/icons-material/ViewInAr";

const FEATURES = createFiveFeature("currentState", "setState");

/**
 * React Component: 模态控制
 */
const ModeController = compose(
  withFive(FEATURES)
)(class extends Component {
  render() {
    return <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation
        showLabels
        value={this.props.$five.currentState.mode}
        onChange={(_, newValue) => {
          this.props.$five.setState({ mode: newValue });
        }}
      >
        <BottomNavigationAction label="全景漫游" icon={<DirectionsWalkIcon/>} value={Five.Mode.Panorama}/>
        <BottomNavigationAction label="空间总览" icon={<ViewInArIcon/>} value={Five.Mode.Floorplan}/>
      </BottomNavigation>
    </Paper>;
  }
})

export { ModeController };