import React, { useContext, useState } from "react";
import Pomodoro from "./Pomo";
import { makeStyles } from "@mui/styles";
import Header from "../Header";
import settingContext from "../SettingContext";
import Setting from "./Pomo/Setting";
import TodoList from "./TodoList";

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
  const settingInfo = useContext(settingContext);

  // Refactor todo list
  const [todos, setTodos] = useState([]);
  // Refactor pomo

  return (
    <div className={classes.container}>
      <div className={classes.alignArea}>
        <Header />
        <div className={classes.containerLayer}>
          <Pomodoro />
          {settingInfo.showSetting && <Setting />}
          <TodoList todos={todos} setTodos={setTodos} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
