import React, { useContext } from "react";
import Pomodoro from "./Pomo";
import { makeStyles } from "@mui/styles";
import Header from "../Header";
import settingContext from "../SettingContext";
import Setting from "./Pomo/Setting";

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: "rgb(217,85,80)",
    minHeight: "100vh",
    width: "100%",
    color: "white",
    transition: "background-color 0.5s ease-in-out 0s",
    paddingBottom: 12,
    boxSizing: "border-box",
  },
}));
const HomePage = () => {
  const classes = useStyles();
  const settingInfo = useContext(settingContext);
  return (
    <div className={classes.container}>
      <Header />
      <Pomodoro />
      {settingInfo.showSetting && <Setting />}
    </div>
  );
};

export default HomePage;
