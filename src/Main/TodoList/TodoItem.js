import React from "react";
import { makeStyles } from "@mui/styles";
import DoneIcon from "@mui/icons-material/Done";

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
}));
const TodoItem = ({ todos }) => {
  const classes = useStyles();
  return (
    <>
      {todos.map((todo) => (
        <div>
          <div className={classes.containerItem} key={todo.id}>
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
                <span>
                  <span>cc</span>
                </span>
                <div>
                  <div>cc</div>
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
