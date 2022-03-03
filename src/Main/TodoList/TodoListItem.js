import React from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  containerListItem: {},
}));

const TodoListItem = () => {
  const classes = useStyles();
  return (
    <div className={classes.containerListItem}>
      <div className={classes.listLayer}>
        <div className={classes.listItem}>
          <div className={classes.item}>
            <div>
              <div className={classes.itemLeft}>
                <Typography> Item name</Typography>
                <button>Button item</button>
              </div>
              <div className={classes.itemRight}>
                <Typography>Quantity</Typography>
                <button>Button item right</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoListItem;
