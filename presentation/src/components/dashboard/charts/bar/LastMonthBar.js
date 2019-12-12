import React, { Component } from "react";
import Barr from "./Bar";

class LastMonthBar extends Component {
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
      eighth: "",
      ninth: "",
      tenth: "",
      eleventh: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      const data = this.props.data;

      this.setState({
        first: data[0] ? data[0].count : "",
        second: data[1] ? data[1].count : "",
        third: data[2] ? data[2].count : "",
        fourth: data[3] ? data[3].count : "",
        fifth: data[4] ? data[4].count : "",
        sixth: data[5] ? data[5].count : "",
        seventh: data[6] ? data[6].count : "",
        eighth: data[7] ? data[7].count : "",
        ninth: data[8] ? data[8].count : "",
        tenth: data[9] ? data[9].count : "",
        eleventh: data[10] ? data[10].count : ""
      });
    }
  }

  render() {
    const title = this.props.title;
    const yLabel = { value: "Users", angle: -90, position: "insideLeft" };
    const xLabel = { value: "Days", position: "inside", dy: +10 };
    const data = [
      {
        name: "1",
        value: this.state.first
      },
      {
        name: "2",
        value: this.state.second
      },
      {
        name: "6",
        value: this.state.third
      },
      {
        name: "10",
        value: this.state.fourth
      },
      {
        name: "12",
        value: this.state.sixth
      },
      {
        name: "16",
        value: this.state.seventh
      },
      {
        name: "20",
        value: this.state.eighth
      },
      {
        name: "24",
        value: this.state.ninth
      },
      {
        name: "28",
        value: this.state.tenth
      },
      {
        name: "30",
        value: this.state.eleventh
      }
    ];

    return (
      <div>
        <Barr title={title} data={data} yLabel={yLabel} xLabel={xLabel} color={this.props.color} />
      </div>
    );
  }
}

export default LastMonthBar;
