import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { TiDeleteOutline } from 'react-icons/ti';
import { DELETE_QUESTION, FETCH_QUESTIONS } from '../config/queries';
import { useMutation } from '@apollo/client';


const QuestionCard = ({data}) => { 
    const [deleteOneQuestion] = useMutation(DELETE_QUESTION, {
        refetchQueries: [{
            query: FETCH_QUESTIONS
        }]
    })
    const handleDelete = (id) => {
        deleteOneQuestion({
            variables: {
                questionId: id
            }
        })
    }
    return (
        <div>
            <div className="d-flex">
                <h5 className="d-inline-block text-truncate" style={{width: '200px'}}>{data.question}</h5>
                <Button onClick={() => handleDelete(data._id)} color="danger" size="sm"><TiDeleteOutline style={{fontSize: '20px'}} /></Button>
            </div>
            <Row>
                {
                    data.choices.map((choice, index) => (
                        <Col key={index} xs="6">
                            <span className="d-inline-block text-truncate" style={{width: '100px'}}>{choice.answer}</span>
                        </Col>
                    ))
                }
            </Row>
        </div>    
    )
}

export default QuestionCard