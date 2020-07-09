import React, { Component } from "react";
import Barr from "./Bar";

class TopBar extends Component {
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
          name: element.name,
          value: element.count,
        };
      });

      this.setState({
        data: newState,
      });
    }
  }

  render() {
    const { title, yLabel, xLabel, color, css } = this.props;
    const { data } = this.state;

    const yLabelConfig = {
      value: yLabel,
      angle: -90,
      position: "insideLeft",
      dx: -10,
    };
    const xLabelConfig = { value: xLabel, position: "center", dy: +10 };

    return (
      <div className={css}>
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

export default TopBar;
