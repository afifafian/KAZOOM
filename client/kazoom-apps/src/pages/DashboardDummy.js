import React from "react";
import auth from "./auth";

export default () => {
    return (
        <>
            <h1>ini dashboard</h1>
            <button
                onclick={() => {
                    auth.logout(() => {
                        this.history.push("/login");
                    });
                }}
            >
                Logout
            </button>
        </>
    );
};
