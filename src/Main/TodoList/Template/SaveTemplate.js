import React, { useContext, useEffect, useRef, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { makeStyles } from "@mui/styles";
import { SettingContext } from "../../../context/SettingContext";
import { updateUser } from "../../../firebase/service";
import { AuthContext } from "../../../context/AuthContext";

const useStyles = makeStyles({
  icon: {
    position: "absolute",
    top: 20,
    right: 24,
    cursor: "pointer",
    width: 17,
    opacity: 0.3,
    zIndex: 100,
  },
  containerTemplate: {
    position: "relative",
    margin: "auto",
    maxWidth: 780,
  },
  layerTemplate: {
    padding: "20px 20px 0px",
  },

  titleTemplate: {
    fontSize: 16,
    color: "rgb(187,187,187)",
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: 16,
  },
  containerInput: {
    display: "flex",
    paddingTop: 10,
    paddingBottom: 14,
    alignItems: "flex-start",
  },
  input: {
    borderRadius: 4,
    padding: "10px 0px",
    boxShadow: "none",
    border: "none",
    color: "rgb(85,85,85)",
    width: "100%",
    boxSizing: "border-box",
    fontWeight: "bold",
    fontSize: 22,
    outline: "none",
  },
  // bottom
  bottomTemplate: {
    padding: "14px 20px",
    textAlign: "right",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: "rgb(239,239,239)",
  },
  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 4,
    cursor: "pointer",
    opacity: 0.9,
    fontSize: 14,
    padding: "8px 12px",
    minWidth: 70,
    display: "inline-block",
    marginRight: 14,
    background: "none",
    border: "none",
    color: "rgb(136,136,136)",
    fontWeight: "bold",
    boxShadow: "none",
  },
  saveButton: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 4,
    cursor: "pointer",
    boxShadow: "rgb(0 0 0/20%) 0px 2px 2px",
    opacity: 0.9,
    backgroundColor: "rgb(171,171,171)",
    fontSize: 14,
    padding: "8px 12px",
    minWidth: 70,
    display: "inline-block",
    marginRight: 14,
    background: "none",
    border: "2px solid rgb(171,171,171)",
    color: "white",
    fontWeight: "bold",
  },
  saveButtonOn: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 4,
    cursor: "pointer",
    boxShadow: "rgb(0 0 0/20%) 0px 2px 2px",
    opacity: 0.9,
    fontSize: 14,
    padding: "8px 12px",
    minWidth: 70,
    display: "inline-block",
    marginRight: 14,
    backgroundColor: "rgb(34,34,34)",
    border: "2px solid rgb(34,34,34)",
    color: "white",
  },
  inputPlaceholder: {
    borderRadius: 4,
    fontSize: 22,
    padding: "10px 0px",
    boxShadow: "none",
    border: "none",
    color: "rgb(85,85,85)",
    width: "100%",
    boxSizing: "border-box",
    fontWeight: "bold",
    opacity: 0.5,
    fontStyle: "italic",
    outline: "none",
  },
});
const SaveTemplate = (todos) => {
  const settingInfo = useContext(SettingContext);
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");

  const checkDisable = () => {
    if (inputValue === "") {
      return true;
    }
    return false;
  };

  function handleCancelSubmit() {
    settingInfo.setShowSaveTemplate(false);
  }

  const { user } = useContext(AuthContext);
  const { template } = useContext(SettingContext);

  function handleSubmitSave() {
    const newTemplate = [
      ...template,
      {
        id: Math.floor(Math.random() * 100),
        title: inputValue,
        taskList: todos,
      },
    ];
    updateUser(user.uid, { template: newTemplate });
    settingInfo.setShowSaveTemplate(false);
  }

  const saveRef = useRef(null);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          settingInfo.setShowSaveTemplate(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(saveRef);

  return (
    <>
      <ClearIcon
        className={classes.icon}
        onClick={() => {
          settingInfo.setShowSaveTemplate(false);
        }}
      />

      <div ref={saveRef} className={classes.containerTemplate}>
        <div className={classes.layerTemplate}>
          <div className={classes.titleTemplate}>Save the template</div>
          <div>
            <input
              type="text"
              defaultValue={inputValue}
              className={inputValue ? classes.input : classes.inputPlaceholder}
              placeholder="Name this template"
              onInput={(e) => setInputValue(e.target.value)}
            />
          </div>
        </div>
        <div className={classes.bottomTemplate}>
          <button className={classes.cancelButton} onClick={handleCancelSubmit}>
            Cancel
          </button>
          <button
            className={inputValue ? classes.saveButtonOn : classes.saveButton}
            disabled={checkDisable()}
            onClick={handleSubmitSave}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default SaveTemplate;
