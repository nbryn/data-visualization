import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import './assets/sass/dashboard.scss?v=1.3.0';
import './assets/fonts/pe-icon-7-stroke.css';

import ChartsjMainView from './views/chartjs/MainView';
import EngagementView from './views/recharts/EngagementView';
import ErrorBoundary from './components/common/ErrorBoundary';
import AccountView from './views/recharts/AccountView';
import TeamSearchView from './views/misc/TeamSearchView';
import TeamView from './views/recharts/TeamView';
import MatchView from './views/recharts/MatchView';
import NotFound from './components/navigation/NotFound';
import UserView from './views/recharts/UserView';
import NGOView from './views/misc/OrgView';
import Profile from './views/user/UserProfile';
import RechartsMainView from './views/recharts/MainView';
import SecureRoute from './components/common/SecureRoute';
import Store from './store/index';
import Signin from './views/user/Signin';
import {UserContextProvider} from './store/UserContext';

class App extends Component {
   render() {
      return (
         <Router>
            <Provider store={Store}>
               <UserContextProvider>
                  <ErrorBoundary>
                     <Switch>
                        <Route exact path="/" component={Signin} />

                        <SecureRoute exact path="/dashboard" component={ChartsjMainView} />

                        <SecureRoute exact path="/overview" component={RechartsMainView} />
                        <SecureRoute exact path="/engagement" component={EngagementView} />
                        <SecureRoute exact path="/accounts" component={AccountView} />
                        <SecureRoute exact path="/teams" component={TeamView} />
                        <SecureRoute exact path="/matches" component={MatchView} />
                        <SecureRoute exact path="/users" component={UserView} />

                        <SecureRoute exact path="/profile" component={Profile} />
                        <SecureRoute exact path="/org-view" component={NGOView} />
                        <SecureRoute exact path="/search" component={TeamSearchView} />

                        <Route path="*" component={NotFound} />
                     </Switch>
                  </ErrorBoundary>
               </UserContextProvider>
            </Provider>
         </Router>
      );
   }
}

export default App;
