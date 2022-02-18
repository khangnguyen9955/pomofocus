import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: 620,
    margin: "auto",
    marginBottom: 20,
    paddingTop: 20,
  },
});
const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <div>
        <Typography>Pomofocus</Typography>
      </div>

      <div>
        <Button variant="contained">Report</Button>
        <Button variant="contained">Setting</Button>
        <Button variant="contained">Login</Button>
      </div>
    </div>
  );
};

export default Header;
