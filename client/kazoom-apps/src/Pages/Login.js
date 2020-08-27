import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import { LOGIN_USER } from '../config/queries';
import { useMutation } from '@apollo/client';
import useSound from 'use-sound';
import clickSound from '../assets/sounds/click_button.mp3';
const MySwal = withReactContent(Swal)

const LoginPage = (props) => {
    const [playButton] = useSound(clickSound)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [loginUser, {data, error}] = useMutation(LOGIN_USER, {
        onCompleted: () => {
            if (error) {
                MySwal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Invalid username or password!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    })

    useEffect(() => {
        if (data) {
            localStorage.setItem(`access_token`, data.loginUser.token)
            localStorage.setItem(`username`, userName)
            props.history.push('/create')
        }
    }, [data])

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
            title: 'Please input your password!',
            showConfirmButton: false,
            timer: 1500
        })
        let userLogin = {
            username: userName,
            password,
        }
        loginUser({
            variables: {
                inputUser: userLogin
            }
        })
    }

    return (
        <>
            {/* <audio controls autoPlay="true" hidden >
                <source 
                src="https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Scott_Holmes/Inspiring__Upbeat_Music/Scott_Holmes_-_01_-_Storybook.mp3" 
                type="audio/ogg" >
                </source>
            </audio> */}
            <div style={{minHeight: '100vh', paddingTop: '10px'}}>
                <img style={{display: 'block', margin: '30px auto'}} width="250" src='https://i.ibb.co/4N7Rf8g/Logo-Kazoom.png' alt="logo"/>
                <div className="formPlay" style={{height: '400px'}}>
                    <h4 className="text-center font-weight-bold mb-4">Login Page</h4>
                    <Form className="text-center">
                        <FormGroup>
                            <Label className="font-weight-bold">Username</Label>
                            <Input onChange={(e) => setUserName(e.target.value)} value={userName} type="text" placeholder="Username here.."/>
                            <Label className="mt-3 font-weight-bold">Password</Label>
                            <Input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password here.."/>
                        </FormGroup>
                        <button className="buttonLogin mt-3 mb-3" type="button" onClick={() => handleClick()}>Login</button>
                    </Form>
                    <small>Don't have account? Register <Link to="/register">here.</Link></small>
                </div>
            </div>
        </>
    )
}

export default LoginPage