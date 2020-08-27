import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { playerPoints } from '../config/makeVar';
import io from 'socket.io-client';
import useSound from 'use-sound';
import nextQuestion from '../assets/sounds/next_question.mp3';
import finalResult from '../assets/sounds/result_page.mp3';
const PORT = 'https://kazoom.ajatdarojat45.space/';


const QuestionPage = () => {
    const [playQuestion] = useSound(nextQuestion)
    const [playResult] = useSound(finalResult)
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
            setQuestions(quests)
            setCorrectStud([])
            setFalseStud([])    
            setDisableButton(false)
            setCount(0)
            setStart(!start)
        })

        //when teacher move to the next question
        socket.on('nextQuestion', () => {
            playQuestion()
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
            playResult()
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
                <div className="mt-5 d-flex justify-content-center"> 
                    <button style={{fontSize: '20px'}} type="button" className="mt-5 buttonLogin" onClick={() => handleQuestion()}>Start Question</button>
                </div>
            )
        } else {
            return (
                <>
                    <h1 className="mt-5 text-center text-light">Please wait for question to start...</h1>
                </>
            )
        }
    }

    return (
        <Container className="text-center mt-5" style={{color: 'white', height: '80vh'}}>
            <h2 className="font-weight-bold">Question {countQuest}</h2>
            <div className="text-center">
                <h3 className="font-weight-bold text-center">Time: {time}</h3>
            </div>
            {
                questions.length > 0 ? (
                    <>
                        <h3>{questions[count].question}</h3>
                        <Row>
                            {
                                questions[count].choices.map((choice, index) => (
                                    <Col key={index} xs="6" className="mt-2">
                                        <button className="buttonAnswer" type="button" disabled={disableButton}
                                        onClick={() => handleAnswer(choice.status)}
                                        style={{width: '200px', background: disableButton && '#4AOT1'}}>{choice.answer}</button>
                                    </Col>
                                ))
                            }
                        </Row>
                    </>
                ) :
                <h1>No Questions!!</h1>
            }
            <div>
                {
                    state && (
                    <div>
                        <div className="d-flex justify-content-center mt-5">
                            <div className="mx-3 answerResult" style={{background: '#206a5d', color: 'white'}}>
                                <span>Correct Answer</span>
                                <ul style={{listStyle: 'none'}}>
                                    {
                                        correctStudent.map((stud, index) => <li key={index}>{stud}</li>)
                                    }
                                </ul>
                            </div>
                            <div className="mx-3 answerResult" style={{background: '#ea5455', color: 'white'}}>
                                <span>Wrong Answer</span>
                                <ul style={{listStyle: 'none'}}>
                                    {
                                        falseStudent.map((stud, index) => <li key={index}>{stud}</li>)
                                    }
                                </ul>
                            </div>
                        </div>
                        <button type="button" className="buttonLogin my-3" style={{fontSize: '20px', background: '#ee6f57'}} onClick={() => handleNextQuestion()}>Next Question</button>
                    </div>
                    )
                }
            </div>
        </Container>
    )
}

export default QuestionPage