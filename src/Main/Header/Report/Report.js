import React, { useContext, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { AuthContext } from "../../../context/AuthContext";
import CloseIcon from "@mui/icons-material/Close";
import { SettingContext } from "../../../context/SettingContext";
import { Pagination } from "@mui/lab";

const useStyles = makeStyles({
  containerReport: {
    backgroundColor: "rgba(0,0,0,0.4)",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    zIndex: 99999999,
    display: "flex",
    pointerEvents: "auto",
    justifyContent: "center",
    overflow: "hidden scroll",
    alignItems: "center",
    transition: "all 0.2s ease-in 0s",
    padding: "48px 0px",
    boxSizing: "border-box",
  },
  layerContainerReport: {
    color: "rgb(34,34,34)",
    borderRadius: 8,
    backgroundColor: "white",
    position: "relative",
    maxWidth: 600,
    width: "95%",
    zIndex: 100,
    borderTop: "1px solid rgb(239,239,239)",
    borderBottom: "1px solid rgb(239,239,239)",
    margin: "auto",
    transition: "all 0.2s ease-in 0s",
    boxShadow: "rgb(0 0 0 / 15%) 0px 10px 20px, rgb(0 0 0/10%) 0px 3px 6px",
    overflow: "hidden",
    display: "block",
    transform: "translateY(-30px)",
  },
  report: {
    position: "relative",
    maxWidth: 780,
    margin: "auto",
  },
  layerReport: {
    padding: 20,
    position: "relative",
  },
  firstContainerItem: {
    borderRadius: 8,
    border: "2px solid rgb(225,155,153)",
    marginTop: 40,
    marginBottom: 40,
    display: "flex",
  },
  secondContainerItem: {
    display: "block",
  },
  summaryItem: {
    cursor: "pointer",
    width: "50%",
    textAlign: "center",
    padding: "8px 0px",
    fontWeight: "bold",
    fontSize: 16,
    color: "rgb(225,155,153)",
  },
  summaryItemFocused: {
    cursor: "pointer",
    width: "50%",
    textAlign: "center",
    padding: "8px 0px",
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    backgroundColor: "rgb(225,155,153)",
  },

  containerSeparate: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    marginTop: 20,
    marginBottom: 28,
  },
  titleSeparateItem: {
    zIndex: 1,
    backgroundColor: "white",
    fontWeight: "bold",
    paddingRight: 12,
    color: "rgb(87,87,87)",
    fontSize: 18,
  },
  separateLine: {
    height: 1,
    width: "100%",
    backgroundColor: "rgb(240,240,240)",
    position: "absolute",
    left: 0,
  },
  containerDetailsSummary: {
    display: "block",
  },
  layerDetailsSummary: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  detailsSummary: {
    marginRight: 14,
    marginBottom: 14,
    padding: "18px 14px",
    textAlign: "right",
    backgroundColor: "rgb(248,232,231)",
    minWidth: 120,
    borderRadius: 8,
    position: "relative",
  },
  imgDetailsSummary: {
    position: "absolute",
    top: 12,
    left: 18,
    width: 28,
    opacity: 0.5,
  },
  contentDetailsSummary: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 6,
    color: "rgb(213,117,114)",
  },
  detailDetailsSummary: {
    fontSize: 13,
    fontWeight: "bold",
    color: "rgb(213,117,114)",
  },

  containerDetailTime: {
    position: "relative",
    borderBottom: "1px solid rgb(235,235,235)",
  },
  titleDetail: {
    display: "flex",
    marginBottom: 8,
  },
  titleDetailDate: {
    fontSize: 12,
    fontWeight: "bold",
    color: "rgb(163,163,163)",
    textTransform: "uppercase",
    width: "20%",
  },
  titleDetailTask: {
    fontSize: 12,
    fontWeight: "bold",
    color: "rgb(163,163,163)",
    textTransform: "uppercase",
    width: "50%",
  },
  titleDetailTime: {
    fontSize: 12,
    fontWeight: "bold",
    color: "rgb(163,163,163)",
    textTransform: "uppercase",
    width: "15%",
    textAlign: "right",
  },
  detailTimeItem: {
    borderTop: "1px solid rgb(235,235,235)",
    padding: "12px 0px",
  },
  containerDetailTimeItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerDateItem: {
    width: "20%",
  },
  dateItem: {
    color: "rgb(187,187,187)",
    fontWeight: "bold",
    fontSize: 14,
  },
  containerTaskItem: {
    width: "50%",
    justifyContent: "space-between",
  },
  taskItem: {
    color: "rgb(85,85,85)",
    fontWeight: "bold",
  },
  containerTimeItem: {
    width: "15%",
  },
  timeItem: {
    textAlign: "right",
    fontSize: 16,
    color: "rgb(87,87,87)",
  },
});
const Report = () => {
  const { login } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const [hourFocused, setHourFocused] = useState(0);
  const [daysAccess, setDaysAccess] = useState(0);
  const [dayStreak, setDayStreak] = useState(0);

  useEffect(() => {
    if (login) {
      const result = user.currentSession.taskList.reduce((acc, obj) => {
        return acc + obj.time;
      }, 0);
      setHourFocused(Math.round((result / 60) * 100) / 100);
    } else {
      setHourFocused("--");
      setDaysAccess("--");
      setDayStreak("--");
    }
  }, [user.currentSession.taskList, login]);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  let PageSize = 10;
  const currentTableData = useMemo(() => {
    if (user.currentSession) {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      return user.currentSession.taskList.slice(firstPageIndex, lastPageIndex);
    }
  }, [currentPage]);
  user.currentSession.taskList.reverse();

  const settingInfo = useContext(SettingContext);
  const classes = useStyles();
  const [focused, setFocused] = useState(1);

  const handleChangePage = (e, value) => {
    setCurrentPage(value);
  };

  return (
    <div className={classes.containerReport}>
      <div className={classes.layerContainerReport}>
        <CloseIcon
          onClick={() => settingInfo.setShowReport(false)}
          sx={{
            position: "absolute",
            top: 20,
            right: 24,
            cursor: "pointer",
            width: 35,
            opacity: 0.3,
            zIndex: 100000,
          }}
        />
        <div className={classes.report}>
          <div className={classes.layerReport}>
            <div className={classes.firstContainerItem}>
              <div
                className={
                  focused === 1
                    ? classes.summaryItemFocused
                    : classes.summaryItem
                }
                onClick={() => setFocused(1)}
                id={1}
              >
                Summary
              </div>
              <div
                className={
                  focused === 2
                    ? classes.summaryItemFocused
                    : classes.summaryItem
                }
                id={2}
                onClick={() => setFocused(2)}
              >
                Detail
              </div>
            </div>
            <div className={classes.secondContainerItem}>
              <div className={classes.containerSeparate}>
                {/*// cho nay se logic chon cai nao !!*/}
                {focused === 1 ? (
                  <div className={classes.titleSeparateItem}>
                    Activity Summary
                  </div>
                ) : (
                  <div className={classes.titleSeparateItem}>
                    Focus Time Detail
                  </div>
                )}

                <div className={classes.separateLine}></div>
              </div>

              {focused === 1 ? (
                <>
                  {login === false && (
                    <div
                      style={{
                        color: "rgb(163,163,163)",
                        fontSize: 16,
                        textAlign: "left",
                        marginTop: 14,
                        marginBottom: 28,
                      }}
                    >
                      * This report will be available when you are logged in
                    </div>
                  )}

                  <div className={classes.containerDetailsSummary}>
                    <div className={classes.layerDetailsSummary}>
                      <div className={classes.detailsSummary}>
                        <AccessTimeIcon
                          className={classes.imgDetailsSummary}
                          sx={{
                            color: "rgb(213,117,114)",
                            fontSize: 35,
                          }}
                        />
                        <div className={classes.contentDetailsSummary}>
                          {hourFocused}
                        </div>
                        <div className={classes.detailDetailsSummary}>
                          hours focused
                        </div>
                      </div>
                      <div className={classes.detailsSummary}>
                        <CalendarTodayIcon
                          className={classes.imgDetailsSummary}
                          sx={{
                            color: "rgb(213,117,114)",
                            fontSize: 35,
                          }}
                        />
                        <div className={classes.contentDetailsSummary}>
                          {daysAccess}
                        </div>

                        <div className={classes.detailDetailsSummary}>
                          days accessed
                        </div>
                      </div>
                      <div className={classes.detailsSummary}>
                        <LocalFireDepartmentIcon
                          sx={{
                            color: "rgb(213,117,114)",
                            fontSize: 35,
                          }}
                          className={classes.imgDetailsSummary}
                        />
                        <div className={classes.contentDetailsSummary}>
                          {dayStreak}
                        </div>
                        <div className={classes.detailDetailsSummary}>
                          days streak
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={classes.containerDetailTime}>
                    {login === false && (
                      <div
                        style={{
                          color: "rgb(163,163,163)",
                          fontSize: 16,
                          textAlign: "left",
                          marginTop: 14,
                          marginBottom: 28,
                        }}
                      >
                        * This report will be available when you are logged in
                      </div>
                    )}
                    <div className={classes.titleDetail}>
                      <div className={classes.titleDetailDate}>Date</div>
                      <div className={classes.titleDetailTask}>Task</div>
                      <div className={classes.titleDetailTime}>Minutes</div>
                    </div>

                    {login && (
                      <>
                        {currentTableData.map((task, index) => (
                          <div className={classes.detailTimeItem} key={index}>
                            <div className={classes.containerDetailTimeItem}>
                              <div className={classes.containerDateItem}>
                                <div className={classes.dateItem}>
                                  {task.date.toLocaleString()}
                                </div>
                              </div>
                              <div className={classes.containerTaskItem}>
                                <div>
                                  <div className={classes.taskItem}>
                                    {task.title}
                                  </div>
                                </div>
                              </div>
                              <div className={classes.containerTimeItem}>
                                <div className={classes.timeItem}>
                                  {task.time}
                                </div>
                              </div>
                              <div style={{ width: "15%" }}></div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                  <div style={{ marginTop: 18 }}>
                    <Pagination
                      count={
                        login
                          ? Math.round(
                              user.currentSession.taskList.length / 9
                            ) + 1
                          : 1
                      }
                      siblingCount={1}
                      sx={{
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                      }}
                      onChange={handleChangePage}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
