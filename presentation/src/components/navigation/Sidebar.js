import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import Logo from "../../assets/img/dashboard.jpeg";

class Sidebar extends Component {
  render() {
    const navLinks = {
      chartjsdashboard: "/mainviews",
      dashboard: "/dashboard",
      groups: "/groups",
      users: "/users",
      finance: "/finance",
      meetings: "/meetings",
      // engagement: "/engagement",
      profile: "/profile",
      ngoview: "/ngo-view",
      search: "/search",
    };

    return (
      <div
        id="sidebar"
        className="sidebar"
        data-color="black"
        data-image="../../assets/img/dashboard.png"
      >
        <div className="logo">
          <img src={Logo} />
        </div>

        <div className="sidebar-wrapper">
          <ul className="nav">
            {Object.keys(navLinks).map((element, index) => (
              <li key={index}>
                <NavLink
                  to={navLinks[element]}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className="pe-7s-graph" />
                  <p>{element}</p>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
