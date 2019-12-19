import React, { Component } from "react";
import CircleChart from "./CircleChart";

class SizeChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
     data: []
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {

      const data = this.props.data;

      console.log(this.props);

      const newState = data.map(element => {
        return {
          name:  element.value,
          value: element.count
        }
      })

      this.setState({
        data: newState
      });
    }
  }

  render() {
    const title = this.props.title;
  
    return (
      <div>
        <CircleChart title={title} data={this.state.data} colors={this.props.colors} />
      </div>
    );
  }
}

export default SizeChart;
