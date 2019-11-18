import React, { Component } from "react";
import Graph from "../Graph/Graph";

import { getMoneyTotal } from "../../../redux/actions/KPI/MoneyTotalAction";

class MoneyTotal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first: "0",
      second: "257",
      third: "338",
      fourth: "469",
      fifth: "767",
      sixth: "897",
      seventh: "900",
      eighth: "950"
    };
  }
  async componentDidMount() {
    // const t = await getMoneyTotal();
    // this.setState({
    //   first: this.props.firstMoney,
    //   second: this.props.secondMoney,
    //   third: this.props.thirdMoney,
    //   fourth: this.props.fourthMoney,
    //   fifth: this.props.fifthMoney,
    //   sixth: this.props.sixthMoney,
    //   seventh: this.props.seventhMoney,
    //   eighth: this.props.eighthMoney
    // })
  }
  render() {
    const yLabel = { value: "Dollars", angle: -90, position: "insideLeft" };
    const xLabel = { value: "Months", position: "insideMiddle", dy: 10 };
    const data = [
      {
        name: "0",
        uv: this.state.first,
        amt: 2400
      },
      {
        name: "5",
        uv: this.state.second,
        amt: 2210
      },
      {
        name: "10",
        uv: this.state.third,
        amt: 2290
      },
      {
        name: "15",
        uv: this.state.fourth,
        amt: 2000
      },
      {
        name: "20",
        uv: this.state.sixth,
        amt: 2181
      },
      {
        name: "25",
        uv: this.state.seventh,
        amt: 2500
      },
      {
        name: "30",
        uv: this.state.eighth,
        amt: 2100
      }
    ];
    return (
      <div>
        <Graph
          title="Amount Registrered"
          data={data}
          yLabel={yLabel}
          xLabel={xLabel}
          stroke="#2196f3"
        />
      </div>
    );
  }
}

export default MoneyTotal;
