import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  LinearProgress,
  Tab,
  Tabs,
  toggleButtonClasses,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { withStyles } from "@mui/styles";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";

const StyledLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  barColorPrimary: {
    backgroundColor: "white",
  },
})(LinearProgress);

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
  const classes = useStyles();
  const [progress, setProgress] = useState(0);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(25);
  const [option, setOption] = useState(0);
  const [play, setPlay] = useState(false);
  const [totalTime, setTotalTime] = useState(minute * 60);

  const handleClick = () => {
    setPlay((pre) => !pre);
  };
  useEffect(() => {
    let interval = null;
    if (play === true) {
      interval = setInterval(() => {
        if (second > 0) {
          setSecond(second - 1);
        }
        if (second === 0) {
          if (minute === 0) {
            clearInterval(interval);
            if (option === 2) {
              setOption(0);
            } else {
              setOption(option + 1);
            }
            setProgress(0);
            setPlay(false);
          } else {
            setMinute(minute - 1);
            setSecond(59);
          }
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [play, second]);

  const handleTab = (e, newE) => {
    setOption(newE);
  };
  // change mode
  useEffect(() => {
    setProgress(0);
    setSecond(0);

    if (option === 0) {
      setMinute(25);
      setTotalTime(25 * 60); // actually we must set total time equal to minute*60 + seconds if not the progress cant run if the user config the break less than 1 minute
      setPlay(false);
    }
    if (option === 1) {
      setMinute(5);
      setTotalTime(5 * 60);
      setPlay(false);
    }
    if (option === 2) {
      setMinute(15);
      setTotalTime(15 * 60);
      setPlay(false);
    }
  }, [option]);

  // progress
  useEffect(() => {
    const percent = (1 - (minute * 60 + second) / totalTime) * 100;
    setProgress(percent);
  }, [second]);

  // handle click next tab
  // khi click show pop up dialog , confirm => next to break , cancel
  const handleNext = (e) => {};
  return (
    <div className={classes.pomodoroArea}>
      <Box className={classes.progressArea}>
        <StyledLinearProgress variant="determinate" value={progress} />
      </Box>
      <Box className={classes.pomodoroContent}>
        <Tabs
          value={option}
          centered
          onChange={handleTab}
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
        <Box className={classes.timer}>
          {option === 0 && (
            <Typography sx={{ fontSize: "120px", fontWeight: "bold" }}>
              {minute < 10 ? `0${minute}` : minute}:
              {second < 10 ? `0${second}` : second}
            </Typography>
          )}
          {option === 1 && (
            <Typography sx={{ fontSize: "120px", fontWeight: "bold" }}>
              {minute < 10 ? `0${minute}` : minute}:
              {second < 10 ? `0${second}` : second}
            </Typography>
          )}
          {option === 2 && (
            <Typography sx={{ fontSize: "120px", fontWeight: "bold" }}>
              {minute < 10 ? `0${minute}` : minute}:
              {second < 10 ? `0${second}` : second}
            </Typography>
          )}
        </Box>

        <Box className={classes.start}>
          <button className={classes.startButton} onClick={handleClick}>
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
