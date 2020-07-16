import React, { Component } from "react";
import CircleChart from "./CircleChart";

class SizeChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      const { data } = this.props;

      const newState = data.map((element) => {
        return {
          name: element.value,
          value: element.count,
        };
      });

      this.setState({
        data: newState,
      });
    }
  }

  render() {
    const { title, colors } = this.props;
    const { data } = this.state;

    return (
      <div className="card-circle card-stats">
        <CircleChart title={title} data={data} colors={colors} />
      </div>
    );
  }
}

export default SizeChart;
