import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { TiDeleteOutline } from 'react-icons/ti';

const QuestionCard = ({data}) => { 

    const handleDelete = (id) => {
        console.log(`hello`)
    }
    return (
        <div>
            <div className="d-flex">
                <h5 className="d-inline-block text-truncate" style={{width: '200px'}}>{data.question}</h5>
                <Button onClick={() => handleDelete(data._id)} color="danger" size="sm"><TiDeleteOutline style={{fontSize: '20px'}} /></Button>
            </div>
            <Row>
                {
                    data.choices.map((answer, index) => (
                        <Col key={index} xs="6">
                            <span className="d-inline-block text-truncate" style={{width: '100px'}}>{answer.message}</span>
                        </Col>
                    ))
                }
            </Row>
        </div>    
    )
}

export default QuestionCard