import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { playerPoint, questionsData } from '../config/makeVar';

const QuestionPage = () => {
    const location = useLocation()
    // console.log(location, `ini location`)
    const [count, setCount] = useState(0)
    const [disableButton, setDisableButton] = useState(false)
    const history = useHistory()
    const questions = questionsData()

    const handleAnswer = (status) => {
        const currentPoint = playerPoint()
        if (status) playerPoint(currentPoint+questions[count].point) 
        setDisableButton(!disableButton)
    }

    const handleNextQuestion = () => {
        setDisableButton(!disableButton)
        if (count < questions.length-1) {
            setCount(count+1)
        } else {
            history.push('/result')
        }
    }

    return (
        <Container className="text-center mt-5">
            <h2>Question {count+1}</h2>
            {
                questions.length > 0 ? (
                    <>
                        <h3>{questions[count].question}</h3>
                        <Row>
                            {
                                questions[count].choices.map((choice, index) => (
                                    <Col key={index} xs="6" className="mt-2 px-2">
                                        <Button disabled={disableButton}
                                        onClick={() => handleAnswer(choice.status)} 
                                        style={{width: '200px'}}>{choice.answer}</Button>
                                    </Col>
                                ))
                            }
                        </Row>
                    </>
                ) :
                <h1>No Questions!!</h1>
            }
            <div className="d-flex justify-content-center mt-5">
                <div className="mx-3">
                    <span>Correct Answer</span>
                    <ul>
                        <li>Maya</li>
                    </ul>
                </div>
                <div className="mx-3">
                    <span>Wrong Answer</span>
                    <ul>
                        <li>Maya</li>
                    </ul>
                </div>
            </div>
            <Button onClick={() => handleNextQuestion()} className="my-3">Next Question</Button>
        </Container>
    )
}

export default QuestionPage