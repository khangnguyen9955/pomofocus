import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useContext } from "react";
import settingContext from "../SettingContext";

const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
    height: 60,
    width: "100%",
    margin: "auto",
    alignItems: "center",
  },
  buttonBar: {
    alignItems: "center",
  },
  headerContainer: {
    padding: "0px 12px",
    maxWidth: 620,
    margin: "auto",
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
  const settingInfo = useContext(settingContext);
  const classes = useStyles();
  return (
    <div className={classes.headerContainer}>
      <div className={classes.header}>
        <div>
          <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
            Pomofocus
          </Typography>
        </div>

        <div className={classes.buttonBar}>
          <StyledButton variant="contained">Report</StyledButton>
          <StyledButton
            variant="contained"
            onClick={() => settingInfo.setShowSetting(true)}
          >
            Setting
          </StyledButton>
          <StyledButton variant="contained">Login</StyledButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
