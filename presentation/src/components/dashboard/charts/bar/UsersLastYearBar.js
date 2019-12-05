import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchUsersLastYear } from "../../../../redux/actions/KPI/UsersLastYearAction";

import Barr from "./Bar";

class UsersLastYearBarChart extends Component {
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

  async componentDidMount() {
    const temp = await this.props.fetchUsersLastYear();

    const signups = this.props.usersLastYear.signups;

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
  render() {
    const title = "Users Last Year";
    const yLabel = { value: "Users", angle: -90, position: "insideLeft" };
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
        <Barr title={title} data={data} yLabel={yLabel} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    usersLastYear: state.KPI.usersLastYear
  };
};

export default connect(mapStateToProps, { fetchUsersLastYear })(
  UsersLastYearBarChart
);
