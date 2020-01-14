import React, { Component } from "react";
import Barr from "./Bar";

import { convertNumberToMonth } from "../../../../util/Date";

class LastYearBar extends Component {
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
        let month = convertNumberToMonth(element.month)
        return {
          name: month + " '" + element.year.toString().substring(2),
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
    const yLabel = { value: "Users", angle: -90, position: "insideLeft" };
    const xLabel = { value: "Months", position: "center", dy: +10 };

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

export default LastYearBar;
