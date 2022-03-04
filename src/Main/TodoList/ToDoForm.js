import React, { useContext, useState } from "react";
import { makeStyles } from "@mui/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import settingContext from "../../SettingContext";

const useStyles = makeStyles(() => ({
  containerForm: {
    backgroundColor: "white",
    borderRadius: 8,
    textAlign: "left",
    marginTop: 12,
    boxShadow: "rgb(0 0 0/ 15%) 0px 10px 20px, rgb(0 0 0/10%) 0px 3px 6px",
    animation: "0.1s ease-in-out 0s 1 normal none running expand",
  },
  containerInputForm: {
    padding: "10px 20px 0px",
  },
  inputForm: {
    position: "relative",
    padding: "8px 0px 18px",
  },
  containerValueItem: {
    padding: "8px 0px",
  },
  containerInput: {
    display: "flex",
    justifyContent: "space-between",
  },
  layerInput: {
    width: "100%",
  },
  inputValue: {
    borderRadius: 4,
    fontSize: 22,
    padding: "10px 0px",
    boxShadow: "none",
    border: "none",
    color: "rgb(85,85,85)",
    width: "100%",
    boxSizing: "border-box",
    fontWeight: "bold",
    outline: "none",
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
  containerPomoValue: {
    justifyContent: "space-between",
    display: "flex",
  },
  layerPomo: {
    width: "100%",
  },
  estimatePomo: {
    marginBottom: 8,
  },
  titleEstimation: {
    color: "rgb(85,85,85)",
    fontWeight: "bold",
  },
  unknown: { display: "none" },
  inputPomo: {
    borderRadius: 4,
    backgroundColor: "rgb(239,239,239)",
    fontSize: 16,
    padding: 10,
    boxShadow: "none",
    border: "none",
    color: "rgb(85,85,85)",
    width: 75,
    marginRight: 10,
    fontWeight: "bold",
  },
  buttonUpDown: {
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 4,
    cursor: "pointer",
    opacity: 0.9,
    fontSize: 14,
    padding: "5px 5px",
    display: "inline-block",
    minWidth: 0,
    backgroundColor: "white",
    color: "rgb(85,85,85)",
    border: "1px solid rgb(223,223,223)",
    boxShadow: "rgb(0 0 0/20%) 0px 2px 2px",
    margin: "0px 2px",
  },
  buttonSign: {
    opacity: 0.6,
    width: 10,
  },
  containerButtonForm: {
    padding: "14px 20px",
    textAlign: "right",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: "rgb(239,239,239)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonDelete: {
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
    visibility: "hidden",
    pointerEvents: "none",
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
}));

const ToDoForm = (props) => {
  const classes = useStyles();
  const settingInfo = useContext(settingContext);
  const [inputValue, setInputValue] = useState("");
  const [pomoValue, setPomoValue] = useState(1);

  // check value input is empty or not
  const checkDisable = () => {
    if (inputValue === "") {
      return true;
    }
    return false;
  };

  function handleDecrement() {
    setPomoValue((value) => value - 1);
  }

  function handleIncrement() {
    setPomoValue((value) => value + 1);
  }

  function handleCancelInput() {
    settingInfo.setShowInputTask((prev) => !prev);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({
      id: Math.floor(Math.random() * 100),
      text: inputValue,
      pomo: pomoValue,
      currentPomo: 0,
    });
    setInputValue("");
    settingInfo.setShowInputTask((prev) => !prev);
  };
  return (
    <>
      {settingInfo.showInputTask && (
        <div className={classes.containerForm}>
          <div className={classes.containerInputForm}>
            <div className={classes.inputForm}>
              <div className={classes.containerValueItem}>
                <div className={classes.containerInput}>
                  <div className={classes.layerInput}>
                    <input
                      type="text"
                      defaultValue={inputValue}
                      onInput={(e) => setInputValue(e.target.value)}
                      placeholder="What are you working on?"
                      className={
                        inputValue
                          ? classes.inputValue
                          : classes.inputPlaceholder
                      }
                    />
                  </div>
                </div>
              </div>
              <div className={classes.containerValueItem}>
                <div className={classes.containerPomoValue}>
                  <div className={classes.layerPomo}>
                    <div className={classes.estimatePomo}>
                      <span className={classes.titleEstimation}>
                        Est Pomodoros
                        <div className={classes.unknown}>Act</div>
                      </span>
                    </div>
                    <input
                      className={classes.inputPomo}
                      value={pomoValue}
                      onInput={(event) =>
                        setPomoValue(parseInt(event.target.value))
                      }
                      type="number"
                    />
                    <button
                      className={classes.buttonUpDown}
                      onClick={handleIncrement}
                    >
                      <ArrowDropUpIcon className={classes.buttonSign} />
                    </button>
                    <button
                      className={classes.buttonUpDown}
                      onClick={handleDecrement}
                    >
                      <ArrowDropDownIcon className={classes.buttonSign} />
                    </button>
                  </div>
                </div>
              </div>
              {/*<div className={classes.containerValueItem}></div> this use for Add note and Add project in furture update*/}
            </div>
          </div>
          <div className={classes.containerButtonForm}>
            <button className={classes.buttonDelete}>Delete</button>
            <div>
              <button
                className={classes.cancelButton}
                onClick={handleCancelInput}
              >
                Cancel
              </button>
              <button
                className={
                  inputValue ? classes.saveButtonOn : classes.saveButton
                }
                disabled={checkDisable()}
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ToDoForm;
