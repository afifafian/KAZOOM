import React from 'react';
import { Link } from 'react-router-dom';
import {Row, Col, Container} from 'reactstrap';
import useSound from 'use-sound';
import clickSound from '../assets/sounds/click_button.mp3';

const Home = () => {
    const [playButton] = useSound(clickSound)
    return (
        <div style={{height: '98vh', width: '192vh'}}>
            <Row>
                <Col style={{marginLeft: '80px'}} xs="5">
                    <Container className="landingPage text-light">
                        <div>
                            <h1 className="font-weight-bold">Welcome to KAZOOM</h1>
                            <h2>Interactive quiz game with live video!</h2>
                        </div>
                    </Container>
                </Col>
                <Col>
                    <div className="d-flex flex-column align-items-center">
                        <img style={{marginTop: '50px'}} width="400" src='https://i.ibb.co/4N7Rf8g/Logo-Kazoom.png' alt="logo"/>
                        
                        <div className="d-flex flex-column" style={{marginTop: '80px'}}>
                            <Link onClick={() => {
                                localStorage.clear()
                                playButton()    
                            }} className="buttonGame" to="/player">Play</Link>
                            <Link onClick={() => {
                                localStorage.clear()
                                playButton()    
                            }} className="buttonGame mt-4" to="/login">Host Game</Link>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Home