import React from "react";
import auth from "./auth";
import { withRouter } from "react-router-dom";

export default (props) => {
    return (
        <>
            <h1>ini dashboard</h1>
            <button
                onClick={() => {
                    auth.logout(() => {
                        localStorage.clear();
                        props.history.push("/login");
                    });
                }}
            >
                Logout
            </button>
        </>
    );
};
