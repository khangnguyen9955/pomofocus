import React, { useContext, useState } from "react";
import Pomodoro from "./Pomo";
import { makeStyles } from "@mui/styles";
import Header from "./Header";
import Setting from "./Pomo/Setting";
import TodoList from "./TodoList";
import { SettingContext } from "../context/SettingContext";
import Report from "./Header/Report/Report";

const useStyles = makeStyles(() => ({
  containerPomo: {
    backgroundColor: "rgb(217,85,80)",
    minHeight: "100vh",
    width: "100%",
    color: "white",
    transition: "background-color 0.5s ease-in-out 0s",
    paddingBottom: 12,
    boxSizing: "border-box",
  },
  containerShort: {
    backgroundColor: "rgb(76,145,149)",
    minHeight: "100vh",
    width: "100%",
    color: "white",
    transition: "background-color 0.5s ease-in-out 0s",
    paddingBottom: 12,
    boxSizing: "border-box",
  },
  containerLong: {
    backgroundColor: "rgb(69,124,163)",
    minHeight: "100vh",
    width: "100%",
    color: "white",
    transition: "background-color 0.5s ease-in-out 0s",
    paddingBottom: 12,
    boxSizing: "border-box",
  },
  containerLayer: {
    maxWidth: 620,
    margin: "auto",
    padding: "0px 12px",
  },
  alignArea: {
    textAlign: "center",
  },
}));
const HomePage = () => {
  const classes = useStyles();
  const settingInfo = useContext(SettingContext);
  const [todos, setTodos] = useState([]);

  return (
    <div
      className={
        settingInfo.pomoBackground
          ? classes.containerPomo
          : settingInfo.shortBackground
          ? classes.containerShort
          : classes.containerLong
      }
    >
      <div className={classes.alignArea}>
        <Header />
        <div className={classes.containerLayer}>
          <Pomodoro todos={todos} />
          {settingInfo.showSetting && <Setting />}
          {settingInfo.showReport && <Report />}
          <TodoList todos={todos} setTodos={setTodos} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
