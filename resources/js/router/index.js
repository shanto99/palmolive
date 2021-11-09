import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import Dashboard from "../components/Dashboard/Dashboard";
import DetailDashboard from "../components/DetailDashboard/DetailDashboard";
import CreateUser from "../components/UserManagement/CreateUser/CreateUser";
import HeadInput from '../components/HeadInput/HeadInput';
import HeadGoalInput from "../components/HeadGoalInput/HeadGoalInput";
import RawReport from "../components/RawReport/RawReport";

class Router extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact={true} path="/create-user" component={CreateUser}/>
                <Route exact={true} path="/input-heads-goal" component={HeadGoalInput} />
                <Route exact={true} path="/input-heads" component={HeadInput} />
                <Route exact={true} path="/detail-report" component={DetailDashboard}/>
                <Route exact={true} path="/raw-report" component={RawReport}/>
                <Route exact={true} path="/" component={Dashboard}/>
            </Switch>
        )
    }
}


export default Router;
