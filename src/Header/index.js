import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: 480,
    margin: "auto",
    marginBottom: 20,
    paddingTop: 20,
    alignItems: "center",
  },
  buttonBar: {
    alignItems: "center",
  },
});

const StyledButton = styled(Button)(() => ({
  marginLeft: 10,
  fontSize: 13,
  color: "white",
  background: "rgba(255,255,255,0.2)",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.5)",
  },
}));
const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <div>
        <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
          Pomofocus
        </Typography>
      </div>

      <div className={classes.buttonBar}>
        <StyledButton variant="contained">Report</StyledButton>
        <StyledButton variant="contained">Setting</StyledButton>
        <StyledButton variant="contained">Login</StyledButton>
      </div>
    </div>
  );
};

export default Header;
