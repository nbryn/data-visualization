import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import './assets/sass/dashboard.scss?v=1.3.0';
import './assets/fonts/pe-icon-7-stroke.css';

import ChartsjMainView from './views/chartjs/MainView';
import EngagementView from './views/recharts/EngagementView';
import FinanceView from './views/recharts/FinanceView';
import GroupSearchView from './views/search/GroupSearchView';
import GroupView from './views/recharts/GroupView';
import MeetingView from './views/recharts/MeetingView';
import NotFound from './components/navigation/NotFound';
import UserView from './views/recharts/UserView';
import NGOView from './views/ngo/NGOView';
import Profile from './views/user/UserProfile.js';
import RechartsMainView from './views/recharts/MainView';
import SecureRoute from './components/common/SecureRoute';
import Store from './store/index';
import Signin from './views/user/Signin.js';

import Sidebar from './components/navigation/Sidebar';

// const ForwardNavLink = React.forwardRef((props, ref) => (
//     // @ts-ignore
//     <GroupSearchView {...props} innerRef={ref} />
// ));

class App extends Component {
    render() {
        return (
            <Router>
                <Provider store={Store}>
                    <Switch>
                        <Route exact path="/" component={Signin} />

                        <SecureRoute
                            exact
                            path="/chartjs-main"
                            component={ChartsjMainView}
                        />

                        <SecureRoute
                            exact
                            path="/dashboard"
                            component={RechartsMainView}
                        />
                        <SecureRoute
                            exact
                            path="/engagement"
                            component={EngagementView}
                        />
                        <SecureRoute
                            exact
                            path="/finance"
                            component={FinanceView}
                        />
                        <SecureRoute
                            exact
                            path="/groups"
                            component={GroupView}
                        />
                        <SecureRoute
                            exact
                            path="/meetings"
                            component={MeetingView}
                        />
                        <SecureRoute exact path="/users" component={UserView} />

                        <SecureRoute
                            exact
                            path="/profile"
                            component={Profile}
                        />
                        <SecureRoute
                            exact
                            path="/ngo-view"
                            component={NGOView}
                        />
                        <SecureRoute
                            exact
                            path="/search"
                            component={GroupSearchView}
                        />
                        <SecureRoute
                            exact
                            path="/s"
                            component={Sidebar}
                        />

                        <Route path="*" component={NotFound} />
                    </Switch>
                </Provider>
            </Router>
        );
    }
}

export default App;
