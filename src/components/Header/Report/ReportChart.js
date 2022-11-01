import React from "react";
import moment from "moment";

const currentMonthDates = Array.from(
  { length: moment().daysInMonth() },
  (x, i) => moment().startOf("month").add(i, "days")
);
console.log("test", currentMonthDates);
const ReportChart = () => {
  return <></>;
};

export default ReportChart;
