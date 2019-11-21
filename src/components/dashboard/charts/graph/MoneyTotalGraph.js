import React, { Component } from "react";
import GraphChart from "./GraphChart";

// import { getMoneyTotal } from "../../../../redux/actions/KPI/MoneyTotalAction";

class MoneyTotalGraph extends Component {
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

export default MoneyTotalGraph;
