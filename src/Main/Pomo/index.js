import {
  LinearProgress,
  linearProgressClasses,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import SettingContext from "./SettingContext";
import { Settings } from "@mui/icons-material";
const StyledLinearProgress = styled(LinearProgress)(() => ({
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "white",
  },
  height: 2,
}));

const useStyles = makeStyles({
  pomodoroArea: {
    maxWidth: 480,
    margin: "auto",
  },
  pomodoroContent: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: " 20px 0px 30px",
    marginBottom: 20,
    borderRadius: 6,
    width: "100%",
  },
  list: {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
  },
  timer: {
    marginTop: 20,
    textAlign: "center",
  },
  start: {
    width: "100%",
    display: "inline-block",
    position: "relative",
  },
  startButton: {
    cursor: "pointer",
    margin: "20px 0px 0px",
    padding: "0px 12px",
    borderRadius: 4,
    boxShadow: "rgb(235 235 235) 0px 6px 0px",
    fontSize: 22,
    height: 55,
    color: "rgb(217,85,80)",
    fontWeight: "bold",
    width: 200,
    backgroundColor: "white",
    border: "none",
    transition: "0.3s ease-in-out 0s",
  },
  stopButton: {
    cursor: "pointer",
    margin: "20px 0px 0px",
    padding: "0px 12px",
    borderRadius: 4,
    fontSize: 22,
    height: 55,
    color: "rgb(217,85,80)",
    fontWeight: "bold",
    width: 200,
    backgroundColor: "white",
    border: "none",
    transform: "translateY(6px)",
    boxShadow: "none",
    transition: "0.2s ease-in-out 0s",
  },
  progressArea: {
    marginBottom: 40,
    backgroundColor: "rgba(0,0,0,0.1)",
    height: "1px",
  },
  progress: {
    backgroundColor: "white",
  },
  test: {
    color: "white",
  },
  nextButton: {
    marginLeft: 20,
    cursor: "pointer",
    height: 54,
    bottom: -6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
    width: "calc( (100% - 200px)/ 2 + 5%)",
  },
});

const Pomodoro = () => {
  const settingInfo = useContext(SettingContext);
  const classes = useStyles();
  const [second, setSecond] = useState(0);
  const [option, setOption] = useState(0);
  const [play, setPlay] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  // ref
  const optionRef = useRef(option);
  const playRef = useRef(play);
  const secondRef = useRef(second);

  let totalSeconds;
  if (option === 0) {
    totalSeconds = settingInfo.pomoMinute * 60;
  } else if (option === 1) {
    totalSeconds = settingInfo.shortBreakMinute * 60;
  } else {
    totalSeconds = settingInfo.longBreakMinute * 60;
  }
  const percent = (1 - second / totalSeconds) * 100;
  const minute = Math.floor(second / 60);
  let seconds = second % 60;
  function count() {
    secondRef.current--;
    setSecond(secondRef.current);
  }

  useEffect(() => {
    function changeOption() {
      const nextOption = optionRef.current === 0 ? 1 : 0;
      const nextSecond =
        (nextOption === 0
          ? settingInfo.pomoMinute
          : settingInfo.shortBreakMinute) * 60;

      setOption(nextOption);
      optionRef.current = nextOption;

      setSecond(nextSecond);
      secondRef.current = nextSecond;
      playRef.current = !playRef.current;
      setPlay(playRef.current);
    }
    secondRef.current = settingInfo.pomoMinute * 60;
    setSecond(secondRef.current);
    const interval = setInterval(() => {
      if (playRef.current === false) {
        return;
      }
      if (secondRef.current === 0) {
        return changeOption();
      }
      count();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [settingInfo]);

  const handleStart = () => {
    setPlay((play) => !play);
    playRef.current = !playRef.current;
  };

  const handleNext = () => {
    if (
      window.confirm(
        "Are you sure you want to finish the round early? (The remaining time will not be counted in the report.)"
      )
    ) {
      if (option === 0) {
        setOption((option) => option + 1);
        defaultValue(option + 1);
      }
      if (option === 1) {
        setOption((option) => option + 1);
        defaultValue(option + 1);
      }
      if (option === 2) {
        setOption(0);
        defaultValue(0);
      }
    }
  };

  // default option value
  const defaultValue = (e) => {
    setPlay(false);
    playRef.current = false;
    if (e === 0) {
      setSecond(settingInfo.pomoMinute * 60);
      secondRef.current = settingInfo.pomoMinute * 60;
    }
    if (e === 1) {
      setSecond(settingInfo.shortBreakMinute * 60);
      secondRef.current = settingInfo.shortBreakMinute * 60;
    }
    if (e === 2) {
      setSecond(settingInfo.longBreakMinute * 60);
      secondRef.current = settingInfo.longBreakMinute * 60;
    }
  };

  const handleChangeTab = (e, newE) => {
    defaultValue(newE);

    if (playRef.current === true || totalSeconds !== second) {
      if (
        window.confirm(
          "Are you sure you want to finish the round early? (The remaining time will not be counted in the report.)"
        )
      ) {
        setOption(newE);
        optionRef.current = newE;
      }
    } else {
      setOption(newE);
      optionRef.current = newE;
    }
  };

  return (
    <div className={classes.pomodoroArea}>
      <Box className={classes.progressArea}>
        <StyledLinearProgress variant="determinate" value={percent} />
      </Box>
      <Box className={classes.pomodoroContent}>
        <Tabs
          value={option}
          centered
          onChange={handleChangeTab}
          textColor="inherit"
          TabIndicatorProps={{
            style: {
              backgroundColor: "rgba(0,0,0,0.15)",
            },
          }}
        >
          <Tab label="Pomodoro" />
          <Tab label="Short Break" />
          <Tab label="Long Break" />
        </Tabs>
        {/* Display time */}
        <Box className={classes.timer}>
          {/* Pomodoro option */}
          {option === 0 && (
            <Typography sx={{ fontSize: "120px", fontWeight: "bold" }}>
              {minute < 10 ? `0${minute}` : minute}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </Typography>
          )}
          {/* Short Break option */}
          {option === 1 && (
            <Typography sx={{ fontSize: "120px", fontWeight: "bold" }}>
              {minute < 10 ? `0${minute}` : minute}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </Typography>
          )}
          {/* Long Break option */}
          {option === 2 && (
            <Typography sx={{ fontSize: "120px", fontWeight: "bold" }}>
              {minute < 10 ? `0${minute}` : minute}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </Typography>
          )}
        </Box>

        {/* Button Start and Next */}
        <Box className={classes.start}>
          <button
            className={play ? classes.stopButton : classes.startButton}
            onClick={handleStart}
          >
            {play ? "STOP" : "START"}
          </button>
          {play && (
            <div className={classes.nextButton}>
              <NavigateNextIcon
                sx={{ fontSize: 50 }}
                onClick={handleNext}
              ></NavigateNextIcon>
            </div>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Pomodoro;
