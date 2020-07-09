import React, { Component } from "react";
import Barr from "./Bar";

import { convertNumberToMonth } from "../../../../util/Date";

class LastYearBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      const data = this.props.data;

      const newState = data.map((element) => {
        let month = convertNumberToMonth(element.month);
        return {
          name: month + " '" + element.year.toString().substring(2),
          value: element.count,
        };
      });

      this.setState({
        data: newState,
      });
    }
  }

  render() {
    const { title, color, xLabel, yLabel } = this.props;
    const { data } = this.state;
    const yLabelConfig = { value: yLabel, angle: -90, position: "insideLeft" };
    const xLabelConfig = { value: xLabel, position: "center", dy: +10 };

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

export default LastYearBar;
