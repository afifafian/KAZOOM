import React, { useState, useEffect } from 'react';
import { Row, Container, Button } from 'reactstrap';
import { Player } from '../Components';
import { useLocation, useHistory } from 'react-router-dom';
import { questionsData, gameSettingLocal } from '../config/makeVar';
import io from 'socket.io-client';
const PORT = 'http://localhost:4000/'

const Host = () => {
    const socket = io(PORT) 
    const {state} = useLocation()
    const history = useHistory()
    const [players, setPlayers] = useState([])
    const [roomId, setRoomId] = useState('')
    const [title, setTitle] = useState('')

    useEffect(() => {
        // console.log(`testing`)
        const setting = gameSettingLocal()
        questionsData(setting.questions)
        setPlayers(setting.players)
        setRoomId(setting.room)
        setTitle(setting.title)

        socket.on('roomGame', roomDetail => {
            setPlayers(roomDetail.players)
            setRoomId(roomDetail.room)
            setTitle(roomDetail.title)
        })
        socket.on('goPlay', () => {
            history.push(`/question`)
        })
        return () => socket.disconnect();
    }, [])

    const handlePlay = () => {
        socket.emit('goPlay')
        history.push({
            pathname: '/question',
            state: {
                from: 'teacher'
            }
        })
    }
    if (state.from === 'player') return (
        <>
            <h3 className="text-center mt-5">Welcome {localStorage.player}</h3>
            <h4 className="text-center mt-3">Waiting for game to play...</h4>
        </>
    )
    return (
        <div className="d-flex flex-column align-items-center">
            <h2>{title}</h2>
            <h3 className="mt-5 text-center">ID: {roomId}</h3>
            <Container>
                <Row>
                    {
                        players.map((player) => <Player key={player.id} data={player} />)
                    }
                </Row>
            </Container>
            <Button onClick={() => handlePlay()} >Play!</Button>
        </div>
    )
}

export default Host