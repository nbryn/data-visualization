import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/sass/dashboard.scss?v=1.3.0';
import './assets/fonts/pe-icon-7-stroke.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import EngagementView from './views/recharts/EngagementView';
import FinanceView from './views/recharts/FinanceView';
import GroupView from './views/recharts/GroupView';
import RechartsMainView from './views/recharts/MainView';
import MeetingView from './views/recharts/MeetingView';
import UserView from './views/recharts/UserView';
import NGOView from './views/ngo/NGOView';
import GroupSearchView from './views/search/GroupSearchView';

import ChartsjMainView from './views/chartjs/MainView';

import Signin from './views/user/Signin.js';
import Profile from './views/user/UserProfile.js';
import SecureRoute from './security/SecureRoute';
import NotFound from './components/navigation/NotFound';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Signin} />

            <SecureRoute
              exact
              path="/chartjs-main"
              component={ChartsjMainView}
            />

            <SecureRoute exact path="/dashboard" component={RechartsMainView} />
            <SecureRoute exact path="/engagement" component={EngagementView} />
            <SecureRoute exact path="/finance" component={FinanceView} />
            <SecureRoute exact path="/groups" component={GroupView} />
            <SecureRoute exact path="/meetings" component={MeetingView} />
            <SecureRoute exact path="/users" component={UserView} />

            <SecureRoute exact path="/profile" component={Profile} />
            <SecureRoute exact path="/ngo-view" component={NGOView} />
            <SecureRoute exact path="/search" component={GroupSearchView} />

            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
