import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import ClearIcon from "@mui/icons-material/Clear";
import { SettingContext } from "../../context/SettingContext";

const useStyles = makeStyles(() => ({
  containerSetting: {
    position: "relative",
    margin: "auto",
    maxWidth: 780,
  },
  box: {
    width: 98,
  },
  inputBox: {
    borderRadius: 4,
    backgroundColor: "rgb(239,239,239)",
    fontSize: 16,
    padding: "10px",
    color: "rgb(85,85,85)",
    boxShadow: "none",
    border: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  labelSetting: {
    color: "rgb(187,187,187)",
    textTransform: "uppercase",
  },
  circle: {
    position: "absolute",
    left: 2,
    width: 28,
    height: 28,
    borderRadius: 50,
    backgroundColor: "white",
    boxShadow: "rgb(0 0 0 /30%) 0px 1px 1px",
  },
  autoCircleOn: {
    left: "auto",
    right: 2,
    position: "absolute",
    width: 28,
    height: 28,
    borderRadius: 50,
    backgroundColor: "white",
    boxShadow: "rgb(0 0 0 /30%) 0px 1px 1px",
  },
  button: {
    cursor: "pointer",
    width: 60,
    height: 32,
    borderRadius: 50,
    backgroundColor: "rgb(204,204,204)",
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
  },
  autoButtonOn: {
    cursor: "pointer",
    width: 60,
    height: 32,
    borderRadius: 50,
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "rgb(132,199,51,0.8)",
  },
  inputValueInterval: {
    borderRadius: 4,
    backgroundColor: "rgb(239,239,239)",
    fontSize: 16,
    padding: "10px",
    boxShadow: "none",
    border: "none",
    color: "rgb(85,85,85)",
    boxSizing: "border-box",
    width: 70,
  },
  pseudoSetting: {
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
    transform: "translateY(-175px)",
  },
  backgroundPseudo: {
    backgroundColor: "rgba(0,0,0,0.4)",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease-in 0s",
    overflow: "hidden scroll",
    padding: "48px 0px",
    boxSizing: "border-box",
  },
  icon: {
    position: "absolute",
    top: 20,
    right: 24,
    cursor: "pointer",
    width: 17,
    opacity: 0.3,
    zIndex: 100,
  },
  gridItem: {
    borderTop: "1px solid rgba(182,165,166,0.2)",
    minHeight: 30,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "20px 0px ",
  },
  containerLayer: {
    padding: "20px 20px 0px",
  },
  boxText: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
  },
  labelBox: {
    marginBottom: 4,
    fontWeight: "bold",
    fontSize: 14,
    color: "rgb(187,187,187)",
  },
  buttonSubmit: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    cursor: "pointer",
    boxShadow: "rgb(0 0 0 /20%) 0px 2px 2px",
    color: "white",
    fontSize: 14,
    opacity: 0.9,
    minWidth: 70,
    padding: "8px 12px",
    backgroundColor: "rgb(34,34,34)",
    border: "2px solid rgb(34,34,34)",
    display: "inline-block",
    borderRadius: 4,
  },
  containerButtonSubmit: {
    padding: "14px 20px",
    textAlign: "right",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: "rgb(239,239,239)",
  },
}));

const Setting = ({ showSetting }) => {
  const settingInfo = useContext(SettingContext);
  const [pomodoro, setPomodoro] = useState(settingInfo.pomoMinute);
  const [shortBreak, setShortBreak] = useState(settingInfo.shortBreakMinute);
  const [longBreak, setLongBreak] = useState(settingInfo.longBreakMinute);
  const [disabled, setDisabled] = useState(false);

  const checkValueChange = () => {
    if (settingInfo.pomoMinute != pomodoro) {
      settingInfo.setPreviousValuePomo(settingInfo.pomoMinute);
      settingInfo.setPomoMinute(pomodoro);
      settingInfo.setSettingConfirm((prev) => !prev);
    } else if (settingInfo.shortBreakMinute != shortBreak) {
      settingInfo.setPreviousValueShort(settingInfo.shortBreakMinute);
      settingInfo.setShortBreakMinute(shortBreak);
      settingInfo.setSettingConfirm((prev) => !prev);
    } else if (settingInfo.longBreakMinute != longBreak) {
      settingInfo.setPreviousValueLong(settingInfo.longBreakMinute);
      settingInfo.setLongBreakMinute(longBreak);
      settingInfo.setSettingConfirm((prev) => !prev);
    } else {
      settingInfo.setSettingConfirm(false);
    }
  };

  // need to calculate the current pomo vs setting pomo not stop pomo
  const handleSubmitSetting = () => {
    checkValueChange();
    settingInfo.setShowSetting(false);
  };

  const handleSetAutoBreak = () => {
    settingInfo.setAutoBreak((prev) => !prev);
  };
  const handleSetAutoPomo = () => {
    settingInfo.setAutoPomo((prev) => !prev);
  };
  // useEffect(() => {
  //     console.log("ok luon", shortBreak);
  //     console.log("ok ", settingInfo.shortBreakMinute);
  // }, [checkValueChange]);
  const classes = useStyles();
  useEffect(() => {
    if (
      pomodoro <= 0 ||
      shortBreak <= 0 ||
      longBreak <= 0 ||
      isNaN(pomodoro) === true ||
      isNaN(shortBreak) === true ||
      isNaN(longBreak) === true
    ) {
      setDisabled(true);
    } else setDisabled(false);
  }, [pomodoro, shortBreak, longBreak]);
  return (
    <>
      {settingInfo.showSetting && (
        <div className={classes.backgroundPseudo}>
          <div className={classes.pseudoSetting}>
            <ClearIcon
              className={classes.icon}
              onClick={() => {
                settingInfo.setShowSetting(false);
              }}
            />
            <div className={classes.containerSetting}>
              <Grid
                container
                direction="column"
                spacing={3}
                className={classes.containerLayer}
                sx={{ marginTop: 0, marginLeft: 0, width: "100%" }}
              >
                {/* Time  */}
                <Typography
                  className={classes.labelSetting}
                  sx={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginBottom: "16px",
                  }}
                >
                  TIMER SETTING
                </Typography>
                <Box className={classes.gridItem}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      alignItems: "center",
                      display: "flex",
                      color: "rgb(85,85,85)",
                      width: "100%",
                    }}
                  >
                    Time (minutes)
                  </Typography>
                  <Box className={classes.boxText}>
                    <div className={classes.box}>
                      <label className={classes.labelBox}>
                        Pomodoro
                        <input
                          type="number"
                          onInput={(e) => setPomodoro(parseInt(e.target.value))}
                          className={classes.inputBox}
                          defaultValue={settingInfo.pomoMinute}
                        />
                      </label>
                    </div>
                    <div className={classes.box}>
                      <label className={classes.labelBox}>
                        Short Break
                        <input
                          onInput={(e) =>
                            setShortBreak(parseInt(e.target.value))
                          }
                          type="number"
                          className={classes.inputBox}
                          defaultValue={settingInfo.shortBreakMinute}
                        />
                      </label>
                    </div>
                    <div className={classes.box}>
                      <label className={classes.labelBox}>
                        Long Break
                        <input
                          type="number"
                          className={classes.inputBox}
                          onInput={(e) =>
                            setLongBreak(parseInt(e.target.value))
                          }
                          defaultValue={settingInfo.longBreakMinute}
                        />
                      </label>
                    </div>
                  </Box>
                </Box>
                {/* Auto start break */}
                <Box className={classes.gridItem}>
                  <Box
                    className={classes.boxText}
                    sx={{ margin: 0, width: "100%", alignItems: "center" }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        alignItems: "center",
                        display: "flex",
                        color: "rgb(85,85,85)",
                        width: "100%",
                      }}
                    >
                      Auto start Breaks?
                    </Typography>
                    <div
                      className={
                        settingInfo.autoBreak
                          ? classes.autoButtonOn
                          : classes.button
                      }
                      onClick={handleSetAutoBreak}
                    >
                      <div
                        className={
                          settingInfo.autoBreak
                            ? classes.autoCircleOn
                            : classes.circle
                        }
                      ></div>
                    </div>
                  </Box>
                </Box>
                {/* Auto start pomo */}
                <Box className={classes.gridItem}>
                  <Box
                    className={classes.boxText}
                    sx={{ margin: 0, width: "100%", alignItems: "center" }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        alignItems: "center",
                        display: "flex",
                        color: "rgb(85,85,85)",
                        width: "100%",
                      }}
                    >
                      Auto start Pomodoro?
                    </Typography>
                    <div
                      className={
                        settingInfo.autoPomo
                          ? classes.autoButtonOn
                          : classes.button
                      }
                      onClick={handleSetAutoPomo}
                    >
                      <div
                        className={
                          settingInfo.autoPomo
                            ? classes.autoCircleOn
                            : classes.circle
                        }
                      ></div>
                    </div>
                  </Box>
                </Box>
                {/* Long break interval */}
                <Box className={classes.gridItem}>
                  <Box
                    className={classes.boxText}
                    sx={{ margin: 0, width: "100%", alignItems: "center" }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        alignItems: "center",
                        display: "flex",
                        color: "rgb(85,85,85)",
                        width: "100%",
                      }}
                    >
                      Long Break interval
                    </Typography>
                    <div className={classes.button}>
                      <input
                        type="number"
                        defaultValue={settingInfo.longBreakInterval}
                        className={classes.inputValueInterval}
                        onChange={(e) => {
                          settingInfo.setLongBreakInterval(e.target.value);
                        }}
                      />
                    </div>
                  </Box>
                </Box>
              </Grid>
              <div className={classes.containerButtonSubmit}>
                <button
                  className={classes.buttonSubmit}
                  onClick={handleSubmitSetting}
                  disabled={disabled}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Setting;
