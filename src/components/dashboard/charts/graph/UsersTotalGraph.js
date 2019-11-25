import React, { Component } from "react";
import GraphChart from "./GraphChart";

class UsersTotalGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first: "",
      second: "",
      third: "",
      fourth: "",
      fifth: "",
      sixth: "",
      seventh: "",
      eighth: ""
    };
  }
  componentDidMount() {
    this.setState({
      first: "0",
      second: "105",
      third: "169",
      fourth: "312",
      fifth: "418",
      sixth: "499",
      seventh: "512",
      eighth: "748"
    })
  }
  render() {
    const yLabel = { value: "Users", angle: -90, position: "insideLeft" };
    const xLabel = { value: "Months", position: "insideMiddle", dy: 10 };
    const data = [
      {
        name: "0",
        value: this.state.first
      },
      {
        name: "5",
        value: this.state.second
      },
      {
        name: "10",
        value: this.state.third
      },
      {
        name: "15",
        value: this.state.fourth
      },
      {
        name: "20",
        value: this.state.sixth
      },
      {
        name: "25",
        value: this.state.seventh
      },
      {
        name: "30",
        value: this.state.eighth
      }
    ];
    return (
      <div>
        <GraphChart
          title="Total Users"
          data={data}
          xLabel={xLabel}
          yLabel={yLabel}
          stroke="#228b22"
        />
      </div>
    );
  }
}

export default UsersTotalGraph;
