import React from "react";
import Admin from "layouts/Admin.js";
import Splash from "layouts/Splash.js";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { createBrowserHistory } from "history";

const App = () => {
  const { isLoading, isAuthenticated } = useAuth0();
  const hist = createBrowserHistory();

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Router history={hist}>
          <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/splash" component={Splash} />
            {isAuthenticated && (
            <Redirect from="/" to="/admin"/>
            )}
            <Redirect from="/" to="/splash"/>
          </Switch>
        </Router>
      </>
    );
  }
};

export default App;
