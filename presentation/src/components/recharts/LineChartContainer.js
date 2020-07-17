import React, { Component } from "react";
import LineChart from "./LineChart.js";

import { convertNumberToMonth } from "../../util/Date";

class LineChartContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      const { data } = this.props;

      let total = 0;
      let month, year;
      const newState = data.map((element) => {
        total += element.count;
        year = element.year.toString().substring(2);
        month = convertNumberToMonth(element.month);

        return {
          name: month + " '" + year,
          value: total,
        };
      });

      this.setState({ data: newState });
    }
  }
  render() {
    const { title, stroke, yLabel, xLabel } = this.props;
    const { data } = this.state;

    const yLabelConfig = {
      value: yLabel,
      angle: -90,
      position: "insideLeft",
    };
    const xLabelConfig = { value: xLabel, position: "center", dy: 10 };

    return (
      <div className="card-graph card-stats">
        <LineChart
          title={title}
          data={data}
          xLabel={xLabelConfig}
          yLabel={yLabelConfig}
          stroke={stroke}
        />
      </div>
    );
  }
}

export default LineChartContainer;