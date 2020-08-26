import React, { useState } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Swal from 'sweetalert2';
import { Link, useHistory } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import { ADD_USER, GET_USERS } from '../config/queries';
import { useMutation } from '@apollo/client';
import useSound from 'use-sound';
import clickSound from '../assets/sounds/click_button.mp3';

const MySwal = withReactContent(Swal)

const RegisterPage = () => {
    const [playButton] = useSound(clickSound)
    const history = useHistory()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [addUser, {data}] = useMutation(ADD_USER, {
        refetchQueries: [{
            query: GET_USERS
        }],
        onCompleted: () => {
            MySwal.fire({
                position: 'center',
                icon: 'success',
                title: 'We will direct you to our Login Page!',
                showConfirmButton: false,
                timer: 1500
            })
            history.push(`/login`)
        }
    })

    const handleClick = () => {
        playButton()
        if (!userName) return MySwal.fire({
            position: 'center',
            icon: 'error',
            title: 'Please fill your username!',
            showConfirmButton: false,
            timer: 1500
        })
        if (!password) return MySwal.fire({
            position: 'center',
            icon: 'error',
            title: 'Please set your password!',
            showConfirmButton: false,
            timer: 1500
        })
        let userRegister = {
            username: userName,
            password,
        }
        addUser({
            variables: {
                inputUser: userRegister
            }
        })
    }
    return (
        <>
            <div style={{minHeight: '100vh', paddingTop: '10px'}}>
                <img style={{display: 'block', margin: '30px auto'}} width="250" src='https://i.ibb.co/4N7Rf8g/Logo-Kazoom.png' alt="logo"/>
                <div className="formPlay" style={{height: '400px'}}>
                    <h4 className="text-center font-weight-bold mb-4" >Register Page</h4>
                    <Form className="text-center">
                        <FormGroup>
                            <Label className="font-weight-bold">Username</Label>
                            <Input onChange={(e) => setUserName(e.target.value)} value={userName} type="text" placeholder="Username here.."/>
                            <Label className="mt-3 font-weight-bold">Password</Label>
                            <Input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password here.."/>
                        </FormGroup>
                        <button className="buttonLogin mt-3 mb-3" type="button" onClick={() => handleClick()}>Register</button>
                    </Form>
                    <small>Already have account? Login <Link to="/login">here.</Link></small>
                </div>
            </div>
        </>
    )
}

export default RegisterPage