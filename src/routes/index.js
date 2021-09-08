import React from 'react'
import {Route, Switch, Redirect} from "react-router-dom";
import Dashboard from "../components/Dashboard";
import UpdateEmployee from "../components/Employee/UpdateEmployee";

export default function MainRoute() {
    return (
        <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route path="/employee/:employeeId" component={UpdateEmployee}/>
            <Route path="*">
                <Redirect to="/"/>
            </Route>
        </Switch>
    )
}