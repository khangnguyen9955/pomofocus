import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Setting = () => {
  return (
    <>
      <div>
        <Typography>TIMER SETTING</Typography>
        <Grid container>
          {/* Time  */}
          <Grid></Grid>
          {/* Auto start break */}
          <Grid></Grid>
          {/* Auto start pomo */}
          <Grid></Grid>
          {/* Long break interval */}
          <Grid></Grid>
        </Grid>
      </div>
      <Box>
        <Button>OK</Button>
      </Box>
    </>
  );
};

export default Setting;
