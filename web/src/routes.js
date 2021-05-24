import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from "./containers/Login/Login"
import Dashboard from "./containers/Dashboard/Dashboard"
import { isAuthenticated } from "./services/auth";

function Routes() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render = 
            {props => isAuthenticated() 
                ? ( <Component {...props} /> )
                : ( <Redirect to={{ pathname: "/", state: { from: props.location } }} />)
            }
        />
    );
    
  return (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={() => <h1>SignUp</h1>} />
            <PrivateRoute path="/app" component={Dashboard} />
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
  )
}

export default Routes;