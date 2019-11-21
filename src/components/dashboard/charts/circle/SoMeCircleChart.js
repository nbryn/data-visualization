import React, { Component } from "react";

import CircleChart from "./CircleChart";

class SoMeCircleChart extends Component {
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
    const data = [
      {
        name: "Group A",
        value: 750
      },
      {
        name: "Group B",
        value: 500
      },
      {
        name: "Group C",
        value: 600
      },
      {
        name: "Group D",
        value: 200
      },  
    ];

   

    return (
      <div>
        <CircleChart title="SoMe Followers" data={data}  />
      </div>
    );
  }
}

export default SoMeCircleChart;
