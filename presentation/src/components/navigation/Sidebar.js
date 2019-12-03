import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import Logo from "../../assets/img/jamiipay.png";

class Sidebar extends Component {
  render() {
    return (
      <div
        id="sidebar"
        className="sidebar"
        data-color="black"
        data-image="../../assets/img/jamiipay.jpeg"
      >
        <div className="logo">
          <img src={Logo} />
        </div>

        <div className="sidebar-wrapper">
          <ul className="nav">
            <li>
              <NavLink
                to="/dashboard"
                className="nav-link"
                activeClassName="active"
              >
                <i className="pe-7s-graph" />
                <p>Dashboard</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className="nav-link"
                activeClassName="active"
              >
                <i className="pe-7s-user" />
                <p>Profile</p>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;