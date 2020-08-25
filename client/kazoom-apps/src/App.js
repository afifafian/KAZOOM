import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter,
    Switch,
} from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/DashboardDummy";
import Client from "./config/client";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "./App.css";

function App() {
    return (
        <ApolloProvider client={Client}>
            <Router>
                <Switch>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <ProtectedRoute
                        exact
                        path="/dashboard"
                        component={Dashboard}
                    />
                </Switch>
            </Router>
        </ApolloProvider>
    );
}

export default App;
