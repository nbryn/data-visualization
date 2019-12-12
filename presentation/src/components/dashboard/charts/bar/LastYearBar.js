import React, { Component } from "react";
import Barr from "./Bar";

class LastYearBar extends Component {
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

  componentDidUpdate(prevProps) {
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
        
      });
    }
  }

  render() {
    const title = this.props.title;
    const yLabel = { value: "Users", angle: -90, position: "insideLeft" };
    const xLabel = { value: "Months", position: "center", dy: +10 };
    const data = [
      {
        name: this.state.first[0],
        value: this.state.first[1]
      },
      {
        name: this.state.second[0],
        value: this.state.second[1]
      },
      {
        name: this.state.third[0],
        value: this.state.third[1]
      },
      {
        name: this.state.fourth[0],
        value: this.state.fourth[1]
      },
      {
        name: this.state.fifth[0],
        value: this.state.fifth[1]
      },
      {
        name: this.state.sixth[0],
        value: this.state.sixth[1]
      },
      {
        name: this.state.seventh[0],
        value: this.state.seventh[1]
      },
      {
        name: this.state.eighth[0],
        value: this.state.eighth[1]
      },
      {
        name: this.state.ninth[0],
        value: this.state.ninth[1]
      },
      {
        name: this.state.tenth[0],
        value: this.state.tenth[1]
      },
      {
        name: this.state.eleventh[0],
        value: this.state.eleventh[1]
      },
      {
        name: this.state.twelfth[0],
        value: this.state.twelfth[1]
      }
    ];

    return (
      <div>
        <Barr title={title} data={data} yLabel={yLabel} xLabel={xLabel} color={this.props.color} />
      </div>
    );
  }
}

export default LastYearBar;
