import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import TextField from "../form/TextField";
import { MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Dataset, Chart } from "./types";

interface Props extends Dataset {
  labels: string[];
  updateInterval: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const useStyles = makeStyles((theme) => ({
  dropdown: {
    width: 100,
    float: "right",
    marginTop: theme.spacing(-1),
  },
  counter: {
    width: 100,
    float: "left",
    marginTop: theme.spacing(-2),
  },
}));

const LineChart: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const [chart, setChart] = useState<Chart>({
    labels: props.labels,
    datasets: [
      {
        label: props.label,
        fill: props.fill,
        backgroundColor: props.backgroundColor,
        borderColor: props.borderColor,
        pointBorderColor: props.pointBorderColor,
        pointBackgroundColor: props.pointBackgroundColor,
        pointBorderWidth: props.pointBorderWidth,
        pointHoverRadius: props.pointHoverRadius,
        pointHoverBackgroundColor: props.pointHoverBackgroundColor,
        pointHoverBorderColor: props.pointHoverBorderColor,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: props.data,
        counter: props.counter,
      },
    ],
  });

  useEffect(() => {
    const datasets: Dataset[] = chart.datasets;
    datasets![0].data = props.data;
    setChart({
      labels: props.labels,
      datasets: datasets,
    });
  }, [props, chart.datasets]);

  return (
    <>
      <div className={classes.counter}>{/* <h4>{props.counter}</h4> */}</div>
      <div className={classes.dropdown}>
        <TextField
          id="interval"
          label="Interval"
          size="small"
          select
          onChange={props.updateInterval}
        >
          <MenuItem key="Month" value="Month">
            Last Month
          </MenuItem>
          <MenuItem key="Year" value="Year">
            Last Year
          </MenuItem>
        </TextField>
      </div>
      <Line data={chart} />
    </>
  );
};

export default LineChart;
