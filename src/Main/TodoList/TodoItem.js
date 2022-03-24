import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import DoneIcon from "@mui/icons-material/Done";
import { SettingContext } from "../../context/SettingContext";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditForm from "./EditForm";

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
    "&:hover": {
      borderLeft: "6px solid rgb(211,211,211)",
    },
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
    "&:hover": {
      opacity: 0.7,
    },
  },
  itemTicked: {
    display: "inline-block",
    width: 22,
    height: 22,
    marginRight: 10,
    borderRadius: "50%",
    zIndex: 999999999,

    "&:hover": {
      opacity: 0.7,
    },
    border: "2px solid rgb(217,85,80)",
    backgroundColor: "rgb(217,85,80)",
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
  editButtonContainer: {
    width: 30,
    paddingRight: 14,
    textAlign: "center",
  },
  editButton: {
    cursor: "pointer",
    border: "1px solid rgb(223,223,223)",
    borderRadius: 4,
    padding: "2px 4px",
    backgroundColor: "white",
    width: 25,
    "&:hover": {
      backgroundColor: "rgb(211,211,211)",
    },
    zIndex: 1000000000,
  },
  edit: {
    opacity: 0.4,
    marginTop: 3,
    color: "black",
  },
}));
const TodoItem = ({ todos, setTodos }) => {
  const newTodo = [...todos];
  const settingInfo = useContext(SettingContext);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [toggleDone, setToggleDone] = useState(false);

  const editTodo = (todo) => {
    if (!todo.text) {
      return;
    }
    const newList = todos.map((item) => {
      if (item.id === todo.id) {
        const updateItem = { ...todo, completeEdit: true };
        return updateItem;
      }
      return item;
    });
    setTodos(newList);
  };

  const deleteTodo = (id) => {
    const newList = [...todos].filter((todo) => todo.id !== id);
    setTodos(newList);
  };

  function handleClickDoneItem(todo) {
    // when we click one item, that item will be turn on done. and other item not being affected.
    setToggleDone((prev) => !prev);
    todo.done = toggleDone;
  }

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
          {todo.completeEdit === true && (
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
                  <div
                    className={
                      todo.done === true ? classes.itemTicked : classes.itemTick
                    }
                    onClick={() => handleClickDoneItem(todo)}
                  >
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
                  <div className={classes.editButtonContainer}>
                    <div
                      className={classes.editButton}
                      onClick={() => {
                        setShowEditForm(true);
                        setEditForm((prev) => ({
                          ...prev,
                          todo: todo,
                          id: todo.id,
                        }));
                        todo.completeEdit = false;
                      }}
                    >
                      <MoreVertIcon
                        className={classes.edit}
                        sx={{ width: 25 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showEditForm && (
            <>
              {editForm.id === todo.id && (
                <EditForm
                  onSubmit={editTodo}
                  todos={editForm.todo}
                  setShowEditForm={setShowEditForm}
                  deleteTodo={deleteTodo}
                  // editRef={editRef}
                />
              )}
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default TodoItem;
