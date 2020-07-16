import React, { Component } from "react";

import BarChart from "./BarChart";
import { convertNumberToMonth } from "../../util/Date";

class BarChartContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      const { data, type } = this.props;

      let newState = [];
      if (type === "Top") {
        newState = data.map((element) => {
          return {
            name: element.name,
            value: element.count,
          };
        });
      } else {
        newState = data.map((element) => {
          let date =
            type === "Year"
              ? convertNumberToMonth(element.month) +
                " '" +
                element.year.toString().substring(2)
              : element.day.day + "/" + element.day.month;
          return {
            name: date,
            value: element.count,
          };
        });
      }

      this.setState({
        data: newState,
      });
    }
  }

  render() {
    const { title, yLabel, xLabel, color } = this.props;
    const { data } = this.state;

    const yLabelConfig = {
      value: yLabel,
      angle: -90,
      position: "insideLeft",
    };
    const xLabelConfig = { value: xLabel, position: "inside", dy: +10 };

    return (
      <div className="card-circle card-stats">
        <BarChart
          title={title}
          data={data}
          yLabel={yLabelConfig}
          xLabel={xLabelConfig}
          color={color}
        />
      </div>
    );
  }
}

export default BarChartContainer;
