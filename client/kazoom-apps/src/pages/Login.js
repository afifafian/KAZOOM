import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import auth from "./auth";

const GET_USERS = gql`
    query {
        users {
            username
            password
        }
    }
`;

const LOGIN_USER = gql`
    mutation($user: UserInput) {
        loginUser(user: $user) {
            token
        }
    }
`;

export default (props) => {
    const [loginUser, { data }] = useMutation(LOGIN_USER, {
        onCompleted: () => {
            // localStorage.setItem("token", data.token);
            // history.push("/dashboard");
        },
    });

    const [userInput, setUserInput] = useState({
        username: "",
        password: "",
    });

    const history = useHistory();

    useEffect(() => {
        if (data) {
            auth.login(() => {
                localStorage.setItem("token", data.loginUser.token);
                props.history.push("/");
            });

            console.log(`>>>>>>`, data);
        }
    }, [data]);

    const onChange = (e) => {
        let { name, value } = e.target;
        const loginInput = { ...userInput, [name]: value };
        // console.log(loginInput);
        setUserInput(loginInput);
    };

    const handleSubmit = (e) => {
        console.log(userInput);
        e.preventDefault();

        loginUser({
            variables: {
                user: userInput,
            },
        });
    };

    return (
        <div style={{ padding: "10px", width: "500px", height: "300px" }}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        onChange={onChange}
                        type="text"
                        className="form-control"
                        name="username"
                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={onChange}
                        type="password"
                        className="form-control"
                        name="password"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
        </div>
    );
};
