import React, { useContext, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import DoneIcon from "@mui/icons-material/Done";
import { SettingContext } from "../../context/SettingContext";

const useStyles = makeStyles(() => ({
  containerItem: {
    width: "100%",
    backgroundColor: "white",
    boxShadow: "rgb(0 0 0/10%) 0px 4px 4px",
    borderRadius: 4,
    cursor: "pointer",
    marginTop: 8,
    textAlign: "left",
    fontSize: 16,
    boxSizing: "border-box",
    borderLeft: "6px solid transparent",
    transition: "unset",
  },
  containerItemFocused: {
    width: "100%",
    backgroundColor: "white",
    boxShadow: "rgb(0 0 0/10%) 0px 4px 4px",
    borderRadius: 4,
    cursor: "pointer",
    marginTop: 8,
    textAlign: "left",
    fontSize: 16,
    boxSizing: "border-box",
    borderLeft: "6px solid black",
    transition: "unset",
  },
  layerItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  containerItemLeft: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
    padding: " 18px 0px 18px 14px",
    overflowWrap: "break-word",
    width: "75%",
  },
  containerItemRight: {
    display: "flex",
    alignItems: "center",
  },
  itemTick: {
    display: "inline-block",
    width: 22,
    height: 22,
    border: "2px solid rgb(223,223,223)",
    backgroundColor: "rgb(223,223,223)",
    marginRight: 10,
    borderRadius: "50%",
  },
  itemTitle: {
    color: "rgb(85,85,85)",
    fontWeight: "bold",
    width: "85%",
    overflow: "hidden",
    alignItems: "center",
    lineHeight: "1.5em",
  },
  countPomo: {
    display: "inline-block",
    color: "rgb(187,187,187)",
    fontWeight: "bold",
    marginRight: 18,
    width: 40,
    fontSize: 18,
    textAlign: "right",
  },
  totalPomo: {
    fontSize: 14,
    marginLeft: 2,
  },
}));
const TodoItem = ({ todos, setTodos }) => {
  const newTodo = [...todos];
  const settingInfo = useContext(SettingContext);

  useEffect(() => {
    if (settingInfo.focusTodoId.id != null) {
      const currentItem = newTodo.filter(
        (item) => item.id === settingInfo.focusTodoId.id
      );
      currentItem[0].currentPomo = settingInfo.focusTodoId.count;
      setTodos(newTodo);
    }
  }, [settingInfo.focusTodoId]);
  const classes = useStyles();
  return (
    <>
      {todos.map((todo, index) => (
        <div key={index}>
          <div
            className={
              todo.id === settingInfo.focusTodoId.id
                ? classes.containerItemFocused
                : classes.containerItem
            }
            key={todo.id}
            onClick={() =>
              settingInfo.setFocusTodoId({
                count: todo.currentPomo,
                id: todo.id,
              })
            }
          >
            <div className={classes.layerItem}>
              <div className={classes.containerItemLeft}>
                <div className={classes.itemTick}>
                  <DoneIcon
                    sx={{ width: 22, height: 22, margin: 0, border: "none" }}
                  />
                </div>
                <span className={classes.itemTitle}>{todo.text}</span>
              </div>
              <div className={classes.containerItemRight}>
                <span className={classes.countPomo}>
                  {todo.currentPomo}

                  <span className={classes.totalPomo}>/ {todo.pomo}</span>
                </span>
                <div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TodoItem;
