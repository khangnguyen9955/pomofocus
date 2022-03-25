import React, { useContext, useEffect, useRef } from "react";
import { makeStyles } from "@mui/styles";
import ClearIcon from "@mui/icons-material/Clear";
import { SettingContext } from "../../../context/SettingContext";
import { updateUser } from "../../../firebase/service";
import { AuthContext } from "../../../context/AuthContext";

const useStyles = makeStyles({
  containerTemplate: {
    position: "relative",
    maxWidth: 780,
    margin: "auto",
  },
  layerTemplate: {
    overflow: "hidden",
  },
  titleTemplate: {
    fontSize: 16,
    color: "rgb(187,187,187)",
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: 16,
    paddingTop: 18,
  },
  containerItems: {
    borderTop: "1px solid rgb(239,239,239)",
  },
  template: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "12px 18px",
    boxSizing: "border-box",
    overflow: "hidden",

    "&:hover": {
      backgroundColor: "rgb(211,211,211)",
    },
  },
  noTemplate: {
    padding: "18px 12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "rgb(170,170,170)",
  },
});
const AddTemplate = ({ todos, setTodos }) => {
  const classes = useStyles();
  const { template } = useContext(SettingContext);
  const settingInfo = useContext(SettingContext);
  const addRef = useRef(null);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          settingInfo.setShowAddTemplate(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(addRef);

  function handleAddTemplates(id, ref) {
    if (ref.target !== refName.current) {
      console.log(ref.target);
      console.log(refName);
    } else {
      const getTemplate = template.filter((template) => template.id === id);
      const changeID = getTemplate[0].taskList.todos.map(({ id, ...task }) => ({
        ...task,
        id: Math.floor(Math.random() * 100),
      }));
      const newTodos = todos.concat(changeID);
      setTodos(newTodos);
      settingInfo.setShowAddTemplate(false);
    }
  }

  const { user } = useContext(AuthContext);

  function handleDeleteTemplate(id) {
    const newTemplate = [...template].filter((template) => template.id !== id);
    updateUser(user.uid, { template: newTemplate });
  }

  const refName = useRef();
  return (
    <div ref={addRef} className={classes.containerTemplate}>
      <div className={classes.layerTemplate}>
        <div className={classes.titleTemplate}>Select A Template</div>
        <div className={classes.containerItems}>
          {template.length < 1 ? (
            <div className={classes.noTemplate}>
              No template has been saved yet.
            </div>
          ) : (
            <>
              {template.map((item, index) => (
                <div
                  className={classes.template}
                  key={index}
                  ref={(div) => {
                    refName.current = div;
                  }}
                  onClick={(e) => {
                    handleAddTemplates(item.id, e);
                  }}
                >
                  {/* map ra cac template*/}

                  <div style={{ fontSize: 18 }}>{item.title}</div>
                  <div style={{ cursor: "pointer", opacity: 0.2 }}>
                    <ClearIcon
                      sx={{
                        "&:hover": { opacity: 1, color: "grey" },
                        color: "black",
                        opacity: 0.8,
                      }}
                      onClick={() => handleDeleteTemplate(item.id)}
                    />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTemplate;
