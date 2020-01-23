import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./Store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/sass/dashboard.scss?v=1.3.0";
import "./assets/fonts/pe-icon-7-stroke.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import EngagementView from "./components/dashboard/views/EngagementView";
import FinanceView from "./components/dashboard/views/FinanceView";
import GroupView from "./components/dashboard/views/GroupView";
import MainView from "./components/dashboard/views/MainView";
import MeetingView from "./components/dashboard/views/MeetingView";
import UserView from "./components/dashboard/views/UserView";

import NGOGroupView from "./components/ngo/NGOGroupView";

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

            <SecureRoute exact path="/dashboard" component={MainView} />
            <SecureRoute exact path="/engagement" component={EngagementView} />
            <SecureRoute exact path="/finance" component={FinanceView} />
            <SecureRoute exact path="/groups" component={GroupView} />
            <SecureRoute exact path="/meetings" component={MeetingView} />
            <SecureRoute exact path="/users" component={UserView} />
            <SecureRoute exact path="/profile" component={Profile} />

            <SecureRoute exact path="/ngoview" component={NGOGroupView} />

            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
