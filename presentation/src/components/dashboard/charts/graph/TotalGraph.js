import React, { Component } from "react";
import { connect } from "react-redux";
import GraphChart from "./GraphChart.js";

class TotalGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first: ["", ""],
      second: ["", ""],
      third: ["", ""],
      fourth: ["", ""],
      fifth: ["", ""],
      sixth: ["", ""],
      seventh: ["", ""],
      eighth: ["", ""],
      ninth: ["", ""],
      tenth: ["", ""],
      eleventh: ["", ""],
      twelfth: ["", ""]
    };
  }

  async componentDidUpdate(prevProps) {
    if (this.props.signups !== prevProps.signups) {
      const signups = this.props.signups;

      this.setState({
        first: [
          signups[0] ? signups[0].month : "",
          signups[0] ? signups[0].count : ""
        ],
        second: [
          signups[1] ? signups[1].month : "",
          signups[1] ? signups[1].count : ""
        ],
        third: [
          signups[2] ? signups[2].month : "",
          signups[2] ? signups[2].count : ""
        ],
        fourth: [
          signups[3] ? signups[3].month : "",
          signups[3] ? signups[3].count : ""
        ],
        fifth: [
          signups[4] ? signups[4].month : "",
          signups[4] ? signups[4].count : ""
        ],
        sixth: [
          signups[5] ? signups[5].month : "",
          signups[5] ? signups[5].count : ""
        ],
        seventh: [
          signups[6] ? signups[6].month : "",
          signups[6] ? signups[6].count : ""
        ],
        eighth: [
          signups[7] ? signups[7].month : "",
          signups[7] ? signups[7].count : ""
        ],
        ninth: [
          signups[8] ? signups[8].month : "",
          signups[8] ? signups[8].count : ""
        ],
        tenth: [
          signups[9] ? signups[9].month : "",
          signups[9] ? signups[9].count : ""
        ],
        eleventh: [
          signups[10] ? signups[10].month : "",
          signups[10] ? signups[10].count : ""
        ],
        twelfth: [
          signups[11] ? signups[11].month : "",
          signups[11] ? signups[11].count : ""
        ]
      });
    }
  }
  render() {
    const title = this.props.title;
    const stroke = this.props.stroke;
    const state = this.state;
    const yLabel = { value: "Users", angle: -90, position: "insideLeft" };
    const xLabel = { value: "Months", position: "insideMiddle", dy: 10 };
    const data = [
      {
        name: state.first[0],
        value: state.first[1]
      },
      {
        name: state.second[0],
        value: state.first[1] + state.second[1]
      },
      {
        name: state.third[0],
        value: state.first[1] + state.second[1] + state.third[1]
      },
      {
        name: state.fourth[0],
        value:
          state.first[1] + state.second[1] + state.third[1] + state.fourth[1]
      },
      {
        name: state.fifth[0],
        value:
          state.first[1] +
          state.second[1] +
          state.third[1] +
          state.fourth[1] +
          state.fifth[1]
      },
      {
        name: state.sixth[0],
        value:
          state.first[1] +
          state.second[1] +
          state.third[1] +
          state.fourth[1] +
          state.fifth[1] +
          state.sixth[1]
      },
      {
        name: state.seventh[0],
        value:
          state.first[1] +
          state.second[1] +
          state.third[1] +
          state.fourth[1] +
          state.fifth[1] +
          state.sixth[1] +
          state.seventh[1]
      },
      {
        name: state.eighth[0],
        value:
          state.first[1] +
          state.second[1] +
          state.third[1] +
          state.fourth[1] +
          state.fifth[1] +
          state.sixth[1] +
          state.seventh[1] +
          state.eighth[1]
      },
      {
        name: state.ninth[0],
        value:
          state.first[1] +
          state.second[1] +
          state.third[1] +
          state.fourth[1] +
          state.fifth[1] +
          state.sixth[1] +
          state.seventh[1] +
          state.eighth[1] +
          state.ninth[1]
      },
      {
        name: state.tenth[0],
        value:
          state.first[1] +
          state.second[1] +
          state.third[1] +
          state.fourth[1] +
          state.fifth[1] +
          state.sixth[1] +
          state.seventh[1] +
          state.eighth[1] +
          state.ninth[1] +
          state.tenth[1]
      },
      {
        name: state.eleventh[0],
        value:
          state.first[1] +
          state.second[1] +
          state.third[1] +
          state.fourth[1] +
          state.fifth[1] +
          state.sixth[1] +
          state.seventh[1] +
          state.eighth[1] +
          state.ninth[1] +
          state.tenth[1] +
          state.eleventh[1]
      },
      {
        name: state.twelfth[0],
        value:
          state.first[1] +
          state.second[1] +
          state.third[1] +
          state.fourth[1] +
          state.fifth[1] +
          state.sixth[1] +
          state.seventh[1] +
          state.eighth[1] +
          state.ninth[1] +
          state.tenth[1] +
          state.eleventh[1] +
          state.twelfth[1]
      }
    ];
    return (
      <div>
        <GraphChart
          title={title}
          data={data}
          xLabel={xLabel}
          yLabel={yLabel}
          stroke={stroke}
        />
      </div>
    );
  }
}

export default TotalGraph;
