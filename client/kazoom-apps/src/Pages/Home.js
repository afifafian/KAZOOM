import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <>
            <div className="d-flex flex-column align-items-center home">
                <h1 className="styleLogo mb-5">KAZOOM</h1>
                <Link onClick={() => localStorage.clear()} className="buttonGame" to="/player">Play</Link>
                <Link onClick={() => localStorage.clear()} className="buttonGame" to="/create">Host Game</Link>
            </div>
        </>
    )
}

export default Home