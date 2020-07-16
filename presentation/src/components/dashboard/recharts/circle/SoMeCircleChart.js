import React, { Component } from "react";

import CircleChart from "./CircleChart";

class SoMeCircleChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first: 100,
      second: 200,
      third: 300,
      fourth: 400,
    };
  }

  render() {
    const data = [
      {
        name: "Group A",
        value: this.state.first,
      },
      {
        name: "Group B",
        value: this.state.second,
      },
      {
        name: "Group C",
        value: this.state.third,
      },
      {
        name: "Group D",
        value: this.state.fourth,
      },
    ];

    const colors = [
      "#8884d8",
      "#83a6ed",
      "#d0ed57",
      "#a4de6c",
      "#8ddlel",
      "#82ca9d",
    ];

    return (
      <div>
        <CircleChart title="SoMe Followers" data={data} colors={colors} />
      </div>
    );
  }
}

export default SoMeCircleChart;
