import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { TiDeleteOutline } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import { deleteQuestion } from '../Store/action';

const QuestionCard = ({data, index}) => { 
    const dispatch = useDispatch()   
    const handleDelete = (id) => {
        dispatch(deleteQuestion(id))
    }
    return (
        <div>
            <div className="d-flex">
                <h5 className="d-inline-block text-truncate" style={{width: '200px'}}>{data.title}</h5>
                <Button onClick={() => handleDelete(data.id)} color="danger" size="sm"><TiDeleteOutline style={{fontSize: '20px'}} /></Button>
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