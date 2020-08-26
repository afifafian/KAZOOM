import React, { useState, useEffect, useRef } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
const PORT = 'http://localhost:4000/'

const PlayGate = () => {
    const socket = io(PORT)
    const socketRef = useRef();
    socketRef.current = io.connect("http://localhost:4000");
    const [inputId, setInputId] = useState(``)
    const [player, setPlayer] = useState(``)
    const history = useHistory()
    
    useEffect(() => {
        //if validation of player input is done, go to waiting room
        socket.on('go-waiting', (id) => {
            const location = {
                pathname: `/room/${id}`,
                state: {
                    from: 'player'
                }
            }
            setPlayer(``)
            setInputId(``)
            history.push(location)
        })
        
        //if there is no room with inputed id
        socket.on('invalidId', () => {
            MySwal.fire({
                position: 'center',
                icon: 'error',
                title: 'Invalid ID!',
                showConfirmButton: false,
                timer: 1500
            })
            setInputId(``)
        })

        //if username is already taken
        socket.on('alert-samePlayer', () => {
            MySwal.fire({
                position: 'center',
                icon: 'error',
                title: 'Username already taken!',
                showConfirmButton: false,
                timer: 1500
            })
            setPlayer(``)
        })

        //if room is already full
        socket.on('alert-full', () => {
            MySwal.fire({
                position: 'center',
                icon: 'error',
                title: 'Too late, the game already started.',
                showConfirmButton: false,
                timer: 1500
            })
            setInputId(``)
            setPlayer(``)
        })

        return () => socket.disconnect();
    }, [])

    const handleClick = () => {
        if (!inputId) return MySwal.fire({
            position: 'center',
            icon: 'error',
            title: 'Please input the ID to join!',
            showConfirmButton: false,
            timer: 1500
        })
        if (!player) return MySwal.fire({
            position: 'center',
            icon: 'error',
            title: 'You must set your name first!',
            showConfirmButton: false,
            timer: 1500
        })
        localStorage.setItem('player', player)
        localStorage.setItem(`idRoom`, inputId)
        socket.emit('joinRoom', {
            room: inputId,
            name: player,
            point: 0,
            type: 'student'
        })
    }

    return (
        <div style={{minHeight: '100vh', paddingTop: '10px'}}>
            <img style={{display: 'block', margin: '35px auto'}} width="250" src='https://i.ibb.co/4N7Rf8g/Logo-Kazoom.png' alt="logo"/>
            <div className="formPlay">
                <Form className="text-center">
                    <FormGroup>
                        <Label className="font-weight-bold">Input ID</Label>
                        <Input onChange={(e) => setInputId(e.target.value)} value={inputId} type="text" placeholder="ID here.."/>
                        <Label className="mt-3 font-weight-bold">Your Name</Label>
                        <Input onChange={(e) => setPlayer(e.target.value)} value={player} type="text" placeholder="Name here.."/>
                    </FormGroup>
                    <button className="buttonLogin mt-4" type="button" onClick={() => handleClick()}>Join</button>
                </Form>
            </div>
        </div>
    )
}

export default PlayGate