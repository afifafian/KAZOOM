import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div className="d-flex flex-column align-items-center mt-5">
                <h1>KAZOOM</h1>
                <Link to="/player"><Button>Play</Button></Link>
                <Link to="/create"><Button>Host Game</Button></Link>
            </div>
        </>
    )
}

export default Home