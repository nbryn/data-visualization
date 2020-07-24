import React, { Component } from "react";
import { Cell, PieChart as PieChartt, Pie, ResponsiveContainer } from "recharts";
import { Col } from "react-bootstrap";
import CircularProgress from "@material-ui/core/CircularProgress";

class PieChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: "",
    };

    this.renderLabel = this.renderLabel.bind(this);
  }

  renderLabel(entry) {
    return entry.name;
  }

  componentDidMount() {
    this.setState({
      colors: this.props.colors,
    });
  }
  render() {
    const { data, colors, title } = this.props;
    return (
      <ResponsiveContainer width={400} height="80%">
        <div className="content">
          <Col xs={8}>
            <div className="numbers">
              <p>{title}</p>
            </div>
          </Col>
          {!data ? (
            <div className="spinner">
              <CircularProgress />{" "}
            </div>
          ) : (
            <PieChartt width={350} height={300}>
              <Pie
                label={this.renderLabel}
                dataKey="value"
                nameKey="name"
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#82ca9d"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Pie>
            </PieChartt>
          )}
        </div>
      </ResponsiveContainer>
    );
  }
}

export default PieChart;
