import React, { Component } from "react";
import Barr from "./Bar";

class LastMonthBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      const data = this.props.data;

      const newState = data.map(element => {
        let date = element.day.day + "/" + element.day.month
        return {
          name: date,
          value: element.count
        };
      });

      this.setState({
        data: newState
      });
    }
  }

  render() {
    const title = this.props.title;
    const yLabel = { value: this.props.yLabel, angle: -90, position: "insideLeft" };
    const xLabel = { value: this.props.xLabel, position: "inside", dy: +10 };

    return (
      <div className="card-circle card-stats">
        <Barr 
          title={title}
          data={this.state.data}
          yLabel={yLabel}
          xLabel={xLabel}
          color={this.props.color}
        />
      </div>
    );
  }
}

export default LastMonthBar;
