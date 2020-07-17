import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

import Logo from "../../assets/img/dashboard.jpeg";

class Sidebar extends Component {
  render() {
    const chartjsLinks = {
      dashboard: "/mainviews",
    };

    const rechartsLinks = {
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
            <li>Chartjs</li>

            {Object.keys(chartjsLinks).map((element, index) => (
              <li key={index}>
                <NavLink
                  to={chartjsLinks[element]}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className="pe-7s-graph" />
                  <p>{element}</p>
                </NavLink>
              </li>
            ))}

            <li>Recharts</li>
            {Object.keys(rechartsLinks).map((element, index) => (
              <li key={index}>
                <NavLink
                  to={rechartsLinks[element]}
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
