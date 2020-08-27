import React, { useState, useEffect } from 'react';
import { Row, Container } from 'reactstrap';
import { Player } from '../Components';
import { useLocation, useHistory } from 'react-router-dom';
import { questionsData, gameSettingLocal } from '../config/makeVar';
import io from 'socket.io-client';
import useSound from 'use-sound';
import clickSound from '../assets/sounds/click_button.mp3';
const PORT = 'https://kazoom2.ajatdarojat45.space/'

const Host = () => {
    const socket = io(PORT) 
    const [playButton] = useSound(clickSound)
    const {state} = useLocation()
    const history = useHistory()
    const [players, setPlayers] = useState([])
    const [roomId, setRoomId] = useState('')
    const [title, setTitle] = useState('')

    useEffect(() => {
        //setting waiting room after teacher created quiz
        const setting = gameSettingLocal()
        questionsData(setting.questions)
        setPlayers(setting.players)
        setRoomId(setting.room)
        setTitle(setting.title)

        //updating waiting room everytime player joins
        socket.on('roomGame', roomDetail => {
            setPlayers(roomDetail.players)
        })

        //when teacher confirms, student can be moved to next page
        socket.on('goPlay', (id) => {
            history.push(`/room/${id}/questions`)
        })

        return () => socket.disconnect();
    }, [])

    const handlePlay = () => {
        playButton()
        socket.emit('goPlay')
        history.push({
            pathname: `/room/${roomId}/questions`,
            state: {
                from: 'teacher'
            }
        })
    }

    return (
        <>
            <div className="mt-5 text-light">
                    {
                        state.from === 'player' ? (
                            <>
                                <h3 className="text-center" style={{marginTop: '80px'}}>Welcome {localStorage.player}</h3>
                                <h4 className="text-center mt-3">Waiting for game to play...</h4>
                                <h4 className="mt-5 text-center" ><i>"Isi adalah kosong, kosong adalah isi."</i></h4>
                                <h5 className="mt-2 text-center" ><i>-Tom Sam Chong (Kera Sakti 1996)</i></h5>
                            </>
                        )
                        : (
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
                                <button type="button" className="buttonLogin" onClick={() => handlePlay()} >Play!</button>
                                <h4 className="mt-5 text-center" ><i>"Isi adalah kosong, kosong adalah isi."</i></h4>
                                <h5 className="mt-2 text-center" ><i>-Tom Sam Chong (Kera Sakti 1996)</i></h5>
                            </div>
                        )
                    }
            </div>
        </>
    )    
}

export default Host