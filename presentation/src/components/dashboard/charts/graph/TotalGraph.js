import React, { Component } from "react";
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
    if (this.props.data !== prevProps.data) {
      const data = this.props.data;

      this.setState({
        first: [
          data[0] ? data[0].month : "",
          data[0] ? data[0].count : ""
        ],
        second: [
          data[1] ? data[1].month : "",
          data[1] ? data[1].count : ""
        ],
        third: [
          data[2] ? data[2].month : "",
          data[2] ? data[2].count : ""
        ],
        fourth: [
          data[3] ? data[3].month : "",
          data[3] ? data[3].count : ""
        ],
        fifth: [
          data[4] ? data[4].month : "",
          data[4] ? data[4].count : ""
        ],
        sixth: [
          data[5] ? data[5].month : "",
          data[5] ? data[5].count : ""
        ],
        seventh: [
          data[6] ? data[6].month : "",
          data[6] ? data[6].count : ""
        ],
        eighth: [
          data[7] ? data[7].month : "",
          data[7] ? data[7].count : ""
        ],
        ninth: [
          data[8] ? data[8].month : "",
          data[8] ? data[8].count : ""
        ],
        tenth: [
          data[9] ? data[9].month : "",
          data[9] ? data[9].count : ""
        ],
        eleventh: [
          data[10] ? data[10].month : "",
          data[10] ? data[10].count : ""
        ],
        twelfth: [
          data[11] ? data[11].month : "",
          data[11] ? data[11].count : ""
        ]
      });
    }
  }
  render() {
    const title = this.props.title;
    const stroke = this.props.stroke;
    const state = this.state;
    const yLabel = { value: "Users", angle: -90, position: "insideLeft" };
    const xLabel = { value: "Months", position: "center", dy: 10 };
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
