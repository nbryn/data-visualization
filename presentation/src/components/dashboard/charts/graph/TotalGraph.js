import React, { Component } from "react";
import GraphChart from "./GraphChart.js";

class TotalGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          name: "",
          value: ""
        },
        {
          name: "",
          value: ""
        },
        {
          name: "",
          value: ""
        },
        {
          name: "",
          value: ""
        },
        {
          name: "",
          value: ""
        },
        {
          name: "",
          value: ""
        },
        {
          name: "",
          value: ""
        },
        {
          name: "",
          value: ""
        },
        {
          name: "",
          value: ""
        }
      ]
    };
  }

  async componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      const data = this.props.data;

      let total = 0;
      const newState = data.map(element => {
        total += element.count;
        return {
          name: element.month,
          value: total
        };
      });

      this.setState({ data: newState });
    }
  }
  render() {
    const title = this.props.title;
    const stroke = this.props.stroke;
    const yLabel = { value: "Users", angle: -90, position: "insideLeft" };
    const xLabel = { value: "Months", position: "center", dy: 10 };

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
