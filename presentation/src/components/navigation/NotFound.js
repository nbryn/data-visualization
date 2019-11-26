import React, { Component } from "react";
import {Link} from "react-router-dom";

import PageNotFound from "../../assets/img/PageNotFound.png";

class NotFound extends Component {
  render() {
    return (
      <div>
        <img
          src={PageNotFound}
          style={{
            width: 500,
            height: 500,
            display: "block",
            margin: "auto",
            position: "relative"
          }}
        />
        <center>
          <Link to="/dashboard">Return to Dashboard</Link>
        </center>
      </div>
    );
  }
}

export default NotFound;
