import React, { useState, useEffect, useRef } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';
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
            alert(`invalid ID!`)
            setInputId(``)
        })

        //if username is already taken
        socket.on('alert-samePlayer', () => {
            alert(`username already taken!`)
            setPlayer(``)
        })

        //if room is already full
        socket.on('alert-full', () => {
            alert(`already full!`)
            setInputId(``)
            setPlayer(``)
        })

        return () => socket.disconnect();
    }, [])

    const handleClick = () => {
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
        <div style={{minHeight: '700px', paddingTop: '150px'}}>
            <div className="formPlay">
                <Form className="text-center">
                    <FormGroup>
                        <Label>Input ID</Label>
                        <Input onChange={(e) => setInputId(e.target.value)} value={inputId} type="text" placeholder="ID here.."/>
                        <Label className="mt-3">Your Name</Label>
                        <Input onChange={(e) => setPlayer(e.target.value)} value={player} type="text" placeholder="Name here.."/>
                    </FormGroup>
                    <button className="buttonLogin mt-4" type="button" onClick={() => handleClick()}>Join</button>
                </Form>
            </div>
        </div>
    )
}

export default PlayGate