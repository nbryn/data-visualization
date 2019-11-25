import React, { Component } from "react";

import CircleChart from "./CircleChart";

class GroupSizeChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first: "",
      second: "",
      third: "",
      fourth: "",
      
    };
  }

  componentDidMount() {
    this.setState({
      first: 100,
      second: 200,
      third: 300,
      fourth: 400,
    });
  }

  render() {
    const data = [
      {
        name: "Group A",
        value: this.state.first
      },
      {
        name: "Group B",
        value: this.state.second
      },
      {
        name: "Group C",
        value: this.state.third
      },
      {
        name: "Group D",
        value: this.state.fourth
      }
    ];

    const colors = [
      "#2964d8",
      "#67b6ed",
      "#75ad57",
      "#d9ae6c",
      "#9edlel",
      "#42cb7d"
    ];

    return (
      <div>
        <CircleChart
          title="Group Size"
          data={data}
          colors={colors}
        />
      </div>
    );
  }
}

export default GroupSizeChart;
