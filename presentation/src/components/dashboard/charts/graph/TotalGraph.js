import React, { Component } from "react";
import GraphChart from "./GraphChart.js";

import { convertNumberToMonth } from "../../../../util/Date";

class TotalGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      const data = this.props.data;

      let total = 0;
      let month;
      const newState = data.map(element => {
        total += element.count;
        month = convertNumberToMonth(element.month);

        return {
          name: month,
          value: total
        };
      });

      this.setState({ data: newState });
    }
  }
  render() {
    const title = this.props.title;
    const stroke = this.props.stroke;
    const yLabel = {
      value: this.props.yLabel,
      angle: -90,
      position: "insideLeft"
    };
    const xLabel = { value: this.props.xLabel, position: "center", dy: 10 };

    return (
      <div>
        <GraphChart
          title={title}
          data={this.state.data}
          xLabel={xLabel}
          yLabel={yLabel}
          stroke={stroke}
        />
      </div>
    );
  }
}

export default TotalGraph;
