import React, { useContext, useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ToDoForm from "./ToDoForm";
import TodoItem from "./TodoItem";
import { SettingContext } from "../../context/SettingContext";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AddIcon from "@mui/icons-material/Add";

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
  editButton: {
    borderRadius: 4,
    opacity: 1,
    padding: "4px 0px",
    boxShadow: "rgb(0 0 0 / 15%) 0px 10px 20px, rgb(0 0 0 / 10%) 0px 3px 6px",
    display: "block",
    pointerEvents: "auto",
    position: "absolute",
    backgroundColor: "white",
    transform: "translateY(10px)",
    width: 200,
    right: 0,
    zIndex: 1,
  },
  editOptions: {
    color: "rgb(79,43,45)",
    display: "flex",
    alignItems: "center",
    padding: "10px 16px",
    fontSize: 14,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgb(211,211,211)",
    },
  },

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
const TodoList = ({ todos, setTodos }) => {
  const classes = useStyles();
  const settingInfo = useContext(SettingContext);
  const [finishAt, setFinishAt] = useState(null);
  const [totalPomo, setTotalPomo] = useState(null);
  const [act, setAct] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const editRef = useRef(null);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowEdit(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(editRef);

  function handleAddTaskButton() {
    settingInfo.setShowInputTask((prev) => !prev);
  }

  function calculateFinishAt(pomo, totalPomo, act) {
    let today = new Date();
    let hour = today.getHours();
    let minute = today.getMinutes();
    let pomoHour = pomo / 60;
    let pomoMinute = pomo % 60;
    let breakMinute = (totalPomo - 1) * settingInfo.shortBreakMinute;
    let actCalculate;
    totalPomo > 1 && act > 0
      ? (actCalculate =
          act * settingInfo.pomoMinute +
          (act - 1) * settingInfo.shortBreakMinute)
      : (actCalculate =
          act * settingInfo.pomoMinute + act * settingInfo.shortBreakMinute);
    let totalHour = parseInt(hour) + pomoHour;
    let totalMinute =
      parseInt(minute) + pomoMinute + breakMinute - actCalculate;

    if (totalMinute >= 60) {
      totalHour++;
      totalMinute = totalMinute - 60;
      if (totalHour >= 24) {
        totalHour = Math.floor(totalHour - 24);
      }
      if (totalHour < 10) {
        totalHour = "0" + totalHour;
      }
      if (totalMinute < 10) {
        totalMinute = "0" + totalMinute;
      }
    }
    let time = Math.floor(totalHour) + ":" + totalMinute;
    return time;
  }

  useEffect(() => {
    let getTotalPomo = 0;
    let getAct = 0;
    todos.map((todo) => {
      todo.pomo < todo.currentPomo
        ? (getTotalPomo += todo.currentPomo)
        : (getTotalPomo += todo.pomo);
      getAct += todo.currentPomo;
    });
    setAct(getAct);
    setTotalPomo(getTotalPomo);
    if (getTotalPomo > 0) {
      setFinishAt(
        calculateFinishAt(
          getTotalPomo * settingInfo.pomoMinute,
          getTotalPomo,
          act
        )
      );
    }
  }, [todos, settingInfo]);
  const addTodo = (todo) => {
    if (!todo.text) {
      return;
    }
    const newTodo = [...todos, todo];
    setTodos(newTodo);
  };
  return (
    <div className={classes.containerTodoList}>
      <div className={classes.containerTasks}>
        <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>Tasks</Typography>
        <div
          className={classes.containerTasksButton}
          onClick={() => {
            setShowEdit((prev) => !prev);
          }}
        >
          <button className={classes.buttonTask}>
            <MoreVertIcon sx={{ width: 25 }} />
          </button>

          {showEdit && (
            <div className={classes.editButton} ref={editRef}>
              <div className={classes.editOptions}>
                <DeleteOutlineIcon
                  sx={{ opacity: 0.8, width: 20, marginRight: "8px" }}
                />
                Clear finished tasks
              </div>
              <div className={classes.editOptions}>
                <DeleteOutlineIcon
                  sx={{ opacity: 0.8, width: 20, marginRight: "8px" }}
                />
                Clear all tasks
              </div>
              <div className={classes.editOptions}>
                <InsertDriveFileIcon
                  sx={{ opacity: 0.8, width: 20, marginRight: "8px" }}
                />
                Save as templates
              </div>
              <div className={classes.editOptions}>
                <AddIcon sx={{ opacity: 0.8, width: 20, marginRight: "8px" }} />
                Add from templates
              </div>
            </div>
          )}
        </div>
      </div>
      <TodoItem todos={todos} setTodos={setTodos} />
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
      {todos.length > 0 && (
        <div className={classes.containerEstimation}>
          <div className={classes.estimation}>
            <div className={classes.estimationItem}>
              Est:
              <span className={classes.estimationValue}>{totalPomo}</span>
            </div>
            <div className={classes.estimationItem}>
              Act:
              <span className={classes.estimationValue}>{act}</span>
            </div>
            <div className={classes.estimationItem}>
              Finish at
              <span className={classes.estimationValue}>{finishAt}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
