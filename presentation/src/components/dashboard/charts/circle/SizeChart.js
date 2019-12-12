import React, { Component } from "react";
import { connect } from "react-redux";
import CircleChart from "./CircleChart";

class SizeChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first: ["", ""],
      second: ["", ""],
      third: ["", ""],
      fourth: ["", ""],
      fifth: ["", ""],
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {


      const data = this.props.data;

      console.log(data);

      this.setState({
        first: [data[0].numberOfMembers, data[0].count],
        second: [data[1].numberOfMembers, data[1].count],
        third: [data[2].numberOfMembers, data[2].count],
        fourth: [data[3].numberOfMembers, data[3].count],
        fifth: [data[4].numberOfMembers, data[4].count]
      });
    }
  }

  render() {
    const title = this.props.title;
    const data = [
      {
        name: this.state.first[1],
        value: this.state.first[0]
      },
      {
        name: this.state.second[1],
        value: this.state.second[0]
      },
      {
        name: this.state.third[1],
        value: this.state.third[0]
      },
      {
        name: this.state.fourth[1],
        value: this.state.fourth[0]
      }
      ,
      {
        name: this.state.fifth[1],
        value: this.state.fifth[0]
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
        <CircleChart title={title} data={data} colors={colors} />
      </div>
    );
  }
}

export default SizeChart;
