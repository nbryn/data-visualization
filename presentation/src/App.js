import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/sass/dashboard.scss?v=1.3.0";
import "./assets/fonts/pe-icon-7-stroke.css";

import Store from "./Store";

import MainOverview from "./components/dashboard/MainOverview.js";
import GroupOverview from "./components/dashboard/GroupOverview";
import MeetingOverview from "./components/dashboard/MeetingOverview";
import UserOverview from "./components/dashboard/UserOverview";

import Signin from "./components/user/Signin.js";
import Profile from "./components/user/UserProfile.js";
import SecureRoute from "./security/SecureRoute";
import NotFound from "./components/navigation/NotFound";

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Signin} />

            <SecureRoute exact path="/dashboard" component={MainOverview} />
            <SecureRoute exact path="/groups" component={GroupOverview} />
            <SecureRoute exact path="/meetings" component={MeetingOverview} />
            <SecureRoute exact path="/users" component={UserOverview} />
            <SecureRoute exact path="/profile" component={Profile} />

            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
