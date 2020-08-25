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
        <div className="questionBox d-flex">
            <div className="d-flex flex-column px-3 py-2">
                <h5 className="d-inline-block text-wrap" style={{width: '300px', color: 'black', fontSize: '18px'}}>{data.question}</h5>
                <Row>
                    {
                        data.choices.map((choice, index) => (
                            <Col key={index} xs="6">
                                <span className="d-inline-block text-truncate answerBox" style={{width: '130px', background: choice.status ? '#306B34' : '#C8553D'}}>{choice.answer}</span>
                            </Col>
                        ))
                    }
                </Row>
            </div>
            <Button onClick={() => handleDelete(data._id)} color="danger" size="sm"><TiDeleteOutline style={{fontSize: '20px'}} /></Button>
        </div>    
    )
}

export default QuestionCard