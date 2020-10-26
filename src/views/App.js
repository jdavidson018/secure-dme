import React from 'react';
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { createBrowserHistory } from "history";

const App = () => {
    const { isLoading } = useAuth0();
    const hist = createBrowserHistory();
    
    if(isLoading){
        return (<div>Loading...</div>)
    } else {
        return (
            <>
                <Router history={hist}>
                    <Switch>
                        <Route path="/admin" component={Admin} />
                        <Route path="/rtl" component={RTL} />
                        <Redirect from="/" to="/admin/login" />
                    </Switch>
                </Router>
            </>
        )
    }
}

export default App