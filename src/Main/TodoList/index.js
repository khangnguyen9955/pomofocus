import React, { useContext, useState } from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ToDoForm from "./ToDoForm";
import settingContext from "../../SettingContext";
import TodoItem from "./TodoItem";

const useStyles = makeStyles(() => ({
  containerTodoList: {
    maxWidth: 480,
    margin: "20px auto 42px",
  },
  containerTasks: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid rgba(255,255,255,0.6)",
    paddingBottom: 14,
  },
  containerTasksButton: {
    position: "relative",
  },
  buttonTask: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 4,
    cursor: "pointer",
    opacity: 0.9,
    background: "none rgba(255,255,255,0.2)",
    boxShadow: "none",
    marginLeft: 10,
    fontSize: 13,
    padding: 8,
    minWidth: "auto",
    border: "none",
    color: "white !important",
  },
  containerListItem: {},
  listLayer: {},
  listItem: {},
  item: {},
  itemLeft: {},
  itemRight: {},
  containerAddTask: {
    width: "100%",
    height: 60,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    opacity: 0.8,
    marginTop: 12,
    border: "2px dashed rgba(255,255,255,0.4)",
  },
  containerEstimation: {
    marginTop: 20,
    padding: "20px 12px",
    borderTop: "1px solid rgba(255,255,255,0.8)",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  estimation: {},
  estimationItem: {
    margin: "0px 8px",
    display: "inline-block",
    color: "rgba(255,255,255,0.7)",
  },
  estimationValue: {
    color: "rgb(255,255,255)",
    fontWeight: "bold",
    fontSize: 24,
    marginLeft: 4,
  },
}));
const TodoList = () => {
  const classes = useStyles();
  const settingInfo = useContext(settingContext);
  const [todos, setTodos] = useState([]);
  function handleAddTaskButton() {
    settingInfo.setShowInputTask((prev) => !prev);
  }

  const addTodo = (todo) => {
    if (!todo.text) {
      return;
    }
    const newTodo = [todo, ...todos];
    setTodos(newTodo);
  };
  console.log("todos", todos);

  return (
    <div className={classes.containerTodoList}>
      <div className={classes.containerTasks}>
        <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>Tasks</Typography>
        <div className={classes.containerTasksButton}>
          <button className={classes.buttonTask}>
            <MoreVertIcon sx={{ width: 25 }} />
          </button>
        </div>
      </div>
      {settingInfo.showInputTask ? (
        <ToDoForm onSubmit={addTodo} />
      ) : (
        <div className={classes.containerAddTask} onClick={handleAddTaskButton}>
          <AddCircleOutlineIcon
            sx={{ width: 23, marginRight: 1, opacity: 0.8 }}
          />
          <Typography sx={{ fontWeight: "bold", opacity: 0.8 }}>
            Add task
          </Typography>
        </div>
      )}

      <TodoItem todos={todos} />
      <div className={classes.containerEstimation}>
        <div className={classes.estimation}>
          <div className={classes.estimationItem}>
            Est:
            <span className={classes.estimationValue}>1</span>
          </div>
          <div className={classes.estimationItem}>
            Act:
            <span className={classes.estimationValue}>0</span>
          </div>
          <div className={classes.estimationItem}>
            Finish at
            <span className={classes.estimationValue}>23:05</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
