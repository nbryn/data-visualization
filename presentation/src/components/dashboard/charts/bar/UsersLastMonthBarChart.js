import React, { Component } from "react";
import { connect } from "react-redux";

import { getUserStats } from "../../../../redux/actions/KPI/UserStatsAction";
import { getMonth } from "../../../../util/Date";

import Barr from "./Bar";

class UsersLastMonthBarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month: "",
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

  async componentDidMount() {
    const temp = await this.props.getUserStats();

    const signups = this.props.userStats.signups;

    this.setState({
      month: getMonth(false),
      first: signups[0].count,
      second: signups[1].count,
      third: signups[2].count,
      fourth: signups[3].count,
      fifth: signups[4].count,
      sixth: signups[5].count,
      seventh: signups[6].count,
      eighth: signups[7].count,
      ninth: signups[8].count,
      tenth: signups[9].count,
      eleventh: signups[10].count
    });
  }
  render() {
    const title = `New Users In ${this.state.month}`;
    const yLabel = { value: "Users", angle: -90, position: "insideLeft" };
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
        <Barr title={title} data={data} yLabel={yLabel} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userStats: state.KPI.userStats
  };
};

export default connect(mapStateToProps, { getUserStats })(
  UsersLastMonthBarChart
);
