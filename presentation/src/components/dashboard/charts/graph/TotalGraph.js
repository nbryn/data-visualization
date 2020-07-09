import React, { Component } from "react";
import GraphChart from "./GraphChart.js";

import { convertNumberToMonth } from "../../../../util/Date";

class TotalGraph extends Component {
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
    const { data, title, stroke, yLabel, xLabel } = this.props;

    const yLabelData = {
      value: yLabel,
      angle: -90,
      position: "insideLeft",
    };
    const xLabelData = { value: xLabel, position: "center", dy: 10 };

    return (
      <div className="card-graph card-stats">
        <GraphChart
          title={title}
          data={data}
          xLabel={xLabelData}
          yLabel={yLabelData}
          stroke={stroke}
        />
      </div>
    );
  }
}

export default TotalGraph;
