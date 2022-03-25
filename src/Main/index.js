import React, { useContext, useState } from "react";
import Pomodoro from "./Pomo";
import { makeStyles } from "@mui/styles";
import Header from "./Header";
import Setting from "./Pomo/Setting";
import TodoList from "./TodoList";
import { SettingContext } from "../context/SettingContext";
import Report from "./Header/Report/Report";
import SaveTemplate from "./TodoList/Template/SaveTemplate";
import AddTemplate from "./TodoList/Template/AddTemplate";

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: "rgba(0,0,0,0.4)",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    zIndex: 99999999,
    display: "flex",
    pointerEvents: "auto",
    justifyContent: "center",
    overflow: "hidden scroll",
    alignItems: "center",
    transition: "all 0.2s ease-in 0s",
    padding: "48px 0px",
    boxSizing: "border-box",
  },
  layerContainer: {
    color: "rgb(34,34,34)",
    borderRadius: 8,
    backgroundColor: "white",
    position: "relative",
    maxWidth: 400,
    width: "95%",
    zIndex: 100,
    borderTop: "1px solid rgb(239,239,239)",
    borderBottom: "1px solid rgb(239,239,239)",
    margin: "auto",
    transition: "all 0.2s ease-in 0s",
    boxShadow: "rgb(0 0 0 / 15%) 0px 10px 20px, rgb(0 0 0/10%) 0px 3px 6px",
    overflow: "hidden",
    display: "block",
    transform: "translateY(-100px)",
  },
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
          {settingInfo.showSetting && (
            <div className={classes.container}>
              <div className={classes.layerContainer}>
                {settingInfo.showSetting && <Setting />}
              </div>
            </div>
          )}
          {settingInfo.showReport && (
            <div className={classes.container}>
              <div className={classes.layerContainer} style={{ maxWidth: 600 }}>
                {settingInfo.showReport && <Report />}
              </div>
            </div>
          )}
          {settingInfo.showAddTemplate && (
            <div className={classes.container}>
              <div className={classes.layerContainer} style={{ maxWidth: 500 }}>
                {settingInfo.showAddTemplate && (
                  <AddTemplate todos={todos} setTodos={setTodos} />
                )}
              </div>
            </div>
          )}
          {settingInfo.showSaveTemplate && (
            <div className={classes.container}>
              <div className={classes.layerContainer} style={{ maxWidth: 500 }}>
                {settingInfo.showSaveTemplate && <SaveTemplate todos={todos} />}
              </div>
            </div>
          )}

          <TodoList todos={todos} setTodos={setTodos} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
