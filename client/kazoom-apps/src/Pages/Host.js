import React from 'react';
import { Row, Container, Button } from 'reactstrap';
import { Player } from '../Components';
import { Link } from 'react-router-dom';
import { gameId, quizTitle } from '../config/makeVar';

const Host = () => {
    return (
        <div className="d-flex flex-column align-items-center">
            <h2>{quizTitle()}</h2>
            <h3 className="mt-5 text-center">ID: {gameId()}</h3>
            <Container>
                <Row>
                    <Player />
                    <Player />
                    <Player />
                    <Player />
                    <Player />
                </Row>
            </Container>
            <Link to={{
                pathname: '/question',
                state: {
                    from: 'Host'
                }
            }}><Button>Play!</Button></Link>
        </div>
    )
}

export default Host