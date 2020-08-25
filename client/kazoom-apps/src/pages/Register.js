import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

export const GET_USER = gql`
    query {
        users {
            _id
            username
            password
        }
    }
`;

const ADD_USER = gql`
    mutation($newUser: UserInput) {
        addUser(newUser: $newUser) {
            username
            password
        }
    }
`;

export default (props) => {
    const [addUser] = useMutation(ADD_USER, {
        refetchQueries: [
            {
                query: GET_USER,
            },
        ],
    });

    const [userInput, setUserInput] = useState({
        username: "",
        password: "",
    });

    const onChange = (e) => {
        let { name, value } = e.target;
        const newUserInput = { ...userInput, [name]: value };
        setUserInput(newUserInput);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addUser({
            variables: {
                newUser: userInput,
            },
        });
        // console.log(userInput);
        props.history.push("/login");
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
                    Register
                </button>
            </form>
        </div>
    );
};
