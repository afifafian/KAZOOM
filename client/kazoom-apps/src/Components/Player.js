import React from 'react';
import { Col } from 'reactstrap';

const Player = ({data}) => {
    return(
        <Col style={{fontWeight: 'bold'}} xs="3" className="my-3">
            <span>{data.user}</span>
        </Col>
    )
}

export default Player