import React, { Component } from "react";
import Graph from "./Graph.js";

class UserLastMonth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first: "0",
      second: "21",
      third: "34",
      fourth: "47",
      fifth: "61",
      sixth: "83",
      seventh: "95",
      eighth: "99"
    };
  }
  render() {
    const yLabel = { value: "Users", angle: -90, position: "insideLeft" };
    const xLabel = { value: "Days", position: "insideMiddle", dy: 10 };
    const data = [
      {
        name: "0",
        uv: this.state.first,
        amt: 2400
      },
      {
        name: "5",
        uv: this.state.second,
        amt: 2210
      },
      {
        name: "10",
        uv: this.state.third,
        amt: 2290
      },
      {
        name: "15",
        uv: this.state.fourth,
        amt: 2000
      },
      {
        name: "20",
        uv: this.state.sixth,
        amt: 2181
      },
      {
        name: "25",
        uv: this.state.seventh,
        amt: 2500
      },
      {
        name: "30",
        uv: this.state.eighth,
        amt: 2100
      }
    ];
    return (
      <div>
        <Graph
          title="Users Last Month"
          data={data}
          xLabel={xLabel}
          yLabel={yLabel}
          stroke="#ff0000"
        />
      </div>
    );
  }
}

export default UserLastMonth;
