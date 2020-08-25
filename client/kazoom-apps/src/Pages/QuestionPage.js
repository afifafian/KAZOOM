import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { playerPoints } from '../config/makeVar';
import io from 'socket.io-client';
const PORT = 'http://localhost:4000/';

const QuestionPage = () => {
    const {state} = useLocation()
    const socket = io(PORT)
    const [count, setCount] = useState(0)
    const [countQuest, setCountQuest] = useState(1)
    const [time, setTime] = useState(null)
    const [questions, setQuestions] = useState([])
    const [correctStudent, setCorrectStud] = useState([])
    const [falseStudent, setFalseStud] = useState([])
    const [start, setStart] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const history = useHistory()

    useEffect(() => {

        //when teacher click start button, the questions set.  
        socket.on('playGame', ({quests, initPlayers}) => {
            const initialPlayers = initPlayers.filter(player => player.type === 'student')
            setQuestions(quests)
            setCorrectStud([])
            setFalseStud([])    
            setDisableButton(false)
            setCount(0)
            setStart(!start)
        })

        //when teacher move to the next question
        socket.on('nextQuestion', () => {
            setDisableButton(false)
            setCorrectStud([])
            setFalseStud([])
        })

        //check student's answer
        socket.on('studentResult', ({correctStud, falseStud, players}) => {
            setCorrectStud(correctStud)
            setFalseStud(falseStud)
            let userName = localStorage.player
            let playersRes = players
            playersRes.forEach(player => {
                if (player.user === userName) {
                    localStorage.setItem('point', player.point)
                } 
            });
            playerPoints(playersRes)
        })

        //timer is set when game start
        socket.on('timerStart', timer => {
            setTime(timer)
        })

        //when the question is done, move to result page
        socket.on('goToResult', (id) => {
            if (localStorage.player) {
                history.push(`/room/${id}/results/student`)
            } else {
                history.push(`/room/${id}/results/teacher`)
            }
        })

    }, [])

    const handleAnswer = (status) => {
        setDisableButton(true)
        let userName = localStorage.player
        let point = Number(questions[count].point)
        socket.emit('checkAnswer', {answerStat: status, name: userName, point})
    }

    const handleNextQuestion = () => {
        if (count < questions.length-1) {
            socket.emit('nextQuestion')
            setCountQuest(countQuest+1)
            setCount(count+1)
            socket.emit('timer')
        } else {
            socket.emit('goToResult')
        }
    }

    const handleQuestion = () => {
        socket.emit('playGame')
        socket.emit('timer')
    }

    if (!start) {
        if (state) {
            return (
                <>
                    <Button className="mt-5" onClick={() => handleQuestion()}>Start Question</Button>
                </>
            )
        } else {
            return (
                <>
                    <h1 className="mt-5 text-center">Please wait for question to start...</h1>
                </>
            )
        }
    }

    return (
        <Container className="text-center mt-5">
            <h2>Question {countQuest}</h2>
            <h3>Time {time}</h3>
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
                {
                    state && (
                    <>
                        <div className="mx-3">
                            <span>Correct Answer</span>
                            <ul>
                                {
                                    correctStudent.map((stud, index) => <li key={index}>{stud}</li>)
                                }
                            </ul>
                        </div>
                        <div className="mx-3">
                            <span>Wrong Answer</span>
                            <ul>
                                {
                                    falseStudent.map((stud, index) => <li key={index}>{stud}</li>)
                                }
                            </ul>
                        </div>
                        <Button onClick={() => handleNextQuestion()} className="my-3">Next Question</Button>
                    </>
                    )
                }
            </div>
        </Container>
    )
}

export default QuestionPage