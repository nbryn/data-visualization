import React, { Component } from "react";
import Barr from "./Bar";

class Top10Bar extends Component {
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

        return {
          name: element.name,
          value: element.totalAmount
        };
      });

      this.setState({
        data: newState
      });
    }
  }

  render() {
    const title = this.props.title;
    const yLabel = { value: this.props.yLabel, angle: -90, position: "insideLeft", dx: -10 };
    const xLabel = { value: this.props.xLabel, position: "center", dy: +10 };

    return (
      <div>
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

export default Top10Bar;