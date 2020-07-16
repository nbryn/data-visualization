import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
} from "@material-ui/core";
import { connect } from "react-redux";
//import PeopleIcon from "@material-ui/icons/People";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import { Chart, ChartData } from "./types";
import { convertNumberToMonth } from "../../util/Date";
import {
  fetchUsersLastMonth,
  fetchUsersLastYear,
} from "../../redux/actions/kpi/UserActions";
import LineChart from "../../components/chartjs/LineChart";
import { RootState } from "../../redux/store";
// import { useChart } from "./useChart";

const useStyles = makeStyles((theme) => ({
  peopleIcon: {
    float: "right",
  },
  chart: {
    position: "absolute",
    left: -240,
    top: 50,
    height: 400,
  },
  chartContent: {
    width: 500,
    height: 500,
  },
}));

type Props = {
  fetchUsersLastYear: Function;
  usersLastMonth: any;
  usersLastYear: any;
};

const UsersTotalContainer: React.FC<Props> = ({
  fetchUsersLastYear,
  usersLastMonth,
  usersLastYear,
}: Props) => {
  const classes = useStyles();

  // const [loading, setLoading] = useState(true);
  const [labels, setLabels] = useState<string[]>([]);
  const [chartData, setChartData] = useState<ChartData>({
    counter: 0,
    data: [],
  });

  const handleChangeInterval = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // const interval: string = e.target.value;
    // // setLoading(true);
    // if (interval === "Month") {
    //   setInitial(false);
    // } else {
    //   setInitial(true);
    // }
  };

  useEffect(() => {
    (async function fetchData(): Promise<void> {
      await fetchUsersLastYear();
      let counter: number = 0;
      const charData: number[] = usersLastYear.map(
        (element: any) => (counter += element.count)
      );

      setChartData({ counter: counter, data: charData });

      setLabels(
        usersLastYear.map((element: any) => {
          return (
            convertNumberToMonth(element.month) +
            element.year.toString().substring(2)
          );
        })
      );
    })();
  }, [chartData]);

  return (
    <Card className={classes.chart}>
      {/* {loading ? (
        <CircularProgress />
      ) : ( */}
      <CardContent className={classes.chartContent}>
        <LineChart
          updateInterval={handleChangeInterval}
          labels={labels}
          label="Users"
          fill={false}
          backgroundColor="rgba(83, 51, 237, 1)"
          borderColor="rgba(83, 51, 237, 1)"
          pointBorderColor="rgba(83, 51, 237, 1)"
          pointBackgroundColor="rgba(83, 51, 237, 1)"
          pointHoverBackgroundColor="rgba(83, 51, 237, 1)"
          pointHoverBorderColor="rgba(83, 51, 237, 1)"
          pointBorderWidth={3}
          pointHoverRadius={2}
          data={chartData.data}
          counter={chartData.counter}
        />
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state: any) => {
  return {
    usersLastMonth: state.KPI.usersLastMonth,
    usersLastYear: state.KPI.usersLastYear,
  };
};

export default connect(mapStateToProps, {
  fetchUsersLastMonth,
  fetchUsersLastYear,
})(UsersTotalContainer);
