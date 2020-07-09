import React, { Component } from "react";
import Barr from "./Bar";

class LastMonthBar extends Component {
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
        let date = element.day.day + "/" + element.day.month;
        return {
          name: date,
          value: element.count,
        };
      });

      this.setState({
        data: newState,
      });
    }
  }

  render() {
    const { title, yLabel, xLabel, color } = this.props;
    const { data } = this.state;

    const yLabelConfig = {
      value: yLabel,
      angle: -90,
      position: "insideLeft",
    };
    const xLabelConfig = { value: xLabel, position: "inside", dy: +10 };

    return (
      <div className="card-circle card-stats">
        <Barr
          title={title}
          data={data}
          yLabel={yLabelConfig}
          xLabel={xLabelConfig}
          color={color}
        />
      </div>
    );
  }
}

export default LastMonthBar;
