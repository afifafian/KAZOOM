import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';
const PORT = 'http://localhost:4000/'

const PlayGate = () => {
    const socket = io(PORT)
    const [inputId, setInputId] = useState(``)
    const [player, setPlayer] = useState(``)
    const history = useHistory()
    const location = {
        pathname: '/room',
        state: {
            from: 'player'
        }
    }
    useEffect(() => {
        socket.on('alert-samePlayer', () => {
            alert(`username already taken!`)
        })

        socket.on('go-waiting', () => {
            history.push(location)
        })

        socket.on('alert-full', () => {
            alert(`already full!`)
        })
        return () => socket.disconnect();
    }, [])
    const handleClick = () => {
        localStorage.setItem('player', player)
        socket.emit('joinRoom', {
            room: inputId,
            name: player,
            point: 0
        })
    }
    return (
        <>
            <div style={{width: '300px', margin: '50px auto'}}>
                <Form className="text-center">
                    <FormGroup>
                        <Label>Input ID</Label>
                        <Input onChange={(e) => setInputId(e.target.value)} type="text" placeholder="ID here.."/>
                        <Label>Your Name</Label>
                        <Input onChange={(e) => setPlayer(e.target.value)} type="text" placeholder="Name here.."/>
                    </FormGroup>
                    <Button onClick={() => handleClick()}>Play!</Button>
                </Form>
            </div>
        </>
    )
}

export default PlayGate