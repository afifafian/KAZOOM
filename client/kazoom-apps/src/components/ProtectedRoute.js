import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../pages/auth";

export const ProtectedRoute = ({ component: component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (auth.isAuthenticated()) {
                    {
                        return <Component {...props} />;
                    }
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                from: props.location,
                            }}
                        />
                    );
                }
            }}
        />
    );
};
