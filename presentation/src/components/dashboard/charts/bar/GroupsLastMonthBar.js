import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchGroupStats } from "../../../../redux/actions/KPI/GroupStatsAction";

import Barr from "./Bar";

class GroupsLastMonthBar extends Component {
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

  async componentDidMount() {
    await this.props.fetchGroupStats();

    const signups = this.props.groupsLastMonth.signups;

    this.setState({
      first: signups[0] ? signups[0].count : "",
      second: signups[1] ? signups[1].count : "",
      third: signups[2] ? signups[2].count : "",
      fourth: signups[3] ? signups[3].count : "",
      fifth: signups[4] ? signups[4].count : "",
      sixth: signups[5] ? signups[5].count : "",
      seventh: signups[6] ? signups[6].count : "",
      eighth: signups[7] ? signups[7].count : "",
      ninth: signups[8] ? signups[8].count : "",
      tenth: signups[9] ? signups[9].count : "",
      eleventh: signups[10] ? signups[10].count : "",
    });
  }
  render() {
    const title = "Groups Last Month";
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
    groupStats: state.KPI.groupStats
  };
};

export default connect(mapStateToProps, { fetchGroupStats })(GroupsLastMonthBar);
