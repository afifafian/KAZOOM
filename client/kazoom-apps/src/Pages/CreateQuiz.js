import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { QuestionCard, Collection} from '../Components';
import { useHistory, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { FETCH_QUESTIONS, ADD_QUESTION, ADD_COLLECTION, FETCH_COLLECTIONS } from '../config/queries';
import { gameSettingLocal, questionsData, collectionsData } from '../config/makeVar';
import Swal from 'sweetalert2'
import useSound from 'use-sound';
import clickSound from '../assets/sounds/click_button.mp3';
import withReactContent from 'sweetalert2-react-content';
import random from 'randomatic';
import io from 'socket.io-client';
const MySwal = withReactContent(Swal)
const PORT = 'http://localhost:4000/'

const CreateQuiz = () => {
    const [playButton] = useSound(clickSound)
    const socket = io(PORT)
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [titleQuiz, setTitleQuiz] = useState('')
    const [idGame, setIdGame] = useState('')
    const [timer, setTimer] = useState('')
    const [questions, setQuestions] = useState([])
    // const questions = questionsData()
    const [collections, setCollections] = useState([])
    const [saveCollection, setSaveCollection] = useState(false) 
    const [pointQuestion, setPointQuestion] = useState('')
    const [answer1, setAnswer1] = useState({
        answer: '',
        status: false,
    })
    const [answer2, setAnswer2] = useState({
        answer: '',
        status: false,
    })
    const [answer3, setAnswer3] = useState({
        answer: '',
        status: false,
    })
    const [answer4, setAnswer4] = useState({
        answer: '',
        status: false,
    })
    const {loading:loadQuestion, error:errQuestion, data:questionRes} = useQuery(FETCH_QUESTIONS)
    const {loading:loadTemp, error:errTemp, data:questionTemp} = useQuery(FETCH_COLLECTIONS)
    const [addQuestion] = useMutation(ADD_QUESTION, {
        refetchQueries: [{
            query: FETCH_QUESTIONS
        }],
        onCompleted: () => {
            setAnswer1({answer: '', status: false})
            setAnswer2({answer: '', status: false})
            setAnswer3({answer: '', status: false})
            setAnswer4({answer: '', status: false})
            setTitle(``)
            setPointQuestion(0)
        }
    })
    const [addTemplate] = useMutation(ADD_COLLECTION, {
        refetchQueries: [{
            query: FETCH_COLLECTIONS
        }],
        onCompleted: () => {
            setSaveCollection(false)
        }
    })

    useEffect(() => {
        if (questionRes) {
            questionsData(questionRes.questions)
            setQuestions(questionsData())
        } else {
            questionsData([])
        }
    },[questionRes])

    useEffect(() => {
        if (questionTemp) {
            const userName = localStorage.username
            const filteredTemp = questionTemp.templates.filter(temp => temp.username === userName)
            collectionsData(filteredTemp)
            setCollections(collectionsData())
        }
    },[questionTemp])
    
    useEffect(() => {
        //generate ID Room
        const id = random('A0', 5)
        setIdGame(id)

        //when teacher is done creating questions, move to waiting room, and setup game setting.
        socket.on('next-page', (gameSett) => {
            const location = {
                pathname: `/room/${gameSett.room}`,
                state: {
                    from: 'teacher'
                }
            }
            gameSettingLocal(gameSett)
            history.push(location)
        })
    }, [])

    const addQuestionsColl = (data) => {
        setQuestions(data)
    }

    const handleGame = () => {
        playButton()
        if (saveCollection) {
            if (!localStorage.access_token) {
                return MySwal.fire({
                    position: 'center',
                    icon: 'error',
                    title: "Please login to save questions to collection!",
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                const collection = {
                    title: titleQuiz,
                    questions: JSON.stringify(questions),
                    token: localStorage.access_token
                }
                addTemplate({
                    variables: {
                        inputTemplate: collection 
                    }
                })
            }
        } 
        
        if (!timer || Number(timer) === 0) return MySwal.fire({
            position: 'center',
            icon: 'warning',
            title: "Please set timer for this quiz!",
            showConfirmButton: false,
            timer: 1500
        })
        if (!titleQuiz) return MySwal.fire({
            position: 'center',
            icon: 'warning',
            title: "Please set title for this quiz!",
            showConfirmButton: false,
            timer: 1500
        })
        let count = 1
        const gameRoom = {
            room: idGame,
            title: titleQuiz,
            time: Number(timer),
            players: [{
                id: count,
                name: 'teacher',
                room: idGame,
                type: 'teacher'
            }],
            questions: questions
        }
        count++
        socket.emit('gameSetting', gameRoom)
        setTitleQuiz(``)
        setTimer(0)
        setIdGame(``)
    }
    const handleChange1 = (e) => {
        const input = e.target
        const name = input.name
        const value = input.type === 'checkbox' ? input.checked : input.value
        setAnswer1({...answer1, [name]: value})
    }
    const handleChange2 = (e) => {
        const input = e.target
        const name = input.name
        const value = input.type === 'checkbox' ? input.checked : input.value
        setAnswer2({...answer2, [name]: value})
    }
    const handleChange3 = (e) => {
        const input = e.target
        const name = input.name
        const value = input.type === 'checkbox' ? input.checked : input.value
        setAnswer3({...answer3, [name]: value})
    }
    const handleChange4 = (e) => {
        const input = e.target
        const name = input.name
        const value = input.type === 'checkbox' ? input.checked : input.value
        setAnswer4({...answer4, [name]: value})
    }
    const handleClick = () => {
        playButton()
        const answers = [answer1, answer2, answer3, answer4]
        const trueAnswers = answers.filter(answer => answer.status)
        if (!title) return MySwal.fire({
            position: 'center',
            icon: 'warning',
            title: "Please fill the question's title!",
            showConfirmButton: false,
            timer: 1500
        })
        if (!pointQuestion || Number(pointQuestion) === 0) return MySwal.fire({
            position: 'center',
            icon: 'warning',
            title: "Please set point to this question!",
            showConfirmButton: false,
            timer: 1500
        })
        if (trueAnswers.length < 1) return MySwal.fire({
            position: 'center',
            icon: 'warning',
            title: "Choose at least one correct answer!",
            showConfirmButton: false,
            timer: 1500
        })
        let newQuestion = {
            question: title,
            choices: JSON.stringify([answer1, answer2, answer3, answer4]),
            point: Number(pointQuestion)
        } 
        addQuestion({
            variables: {
                inputQuestion: newQuestion
            }
        })
    }
    return (
        <div className="bodyCreate">
            <Row>
                <Col xs="4" className="leftCol">
                    <h4 className="text-center mt-3">List Questions</h4>
                    <div style={{maxHeight: '330px', minHeight: '330px',overflow: 'auto', padding: '10px'}}>
                        {
                            questions.length < 1 ? <h5 className="text-center" style={{color: 'grey'}}>No Question.</h5> :
                            questions.map((question) => <QuestionCard key={question._id} data={question}/>)
                        }
                    </div>
                    <hr/>
                    <div className="mt-3" style={{maxHeight: '250px', minHeight: '200px', overflow: 'auto'}}>
                        <h4 className="text-center">Collection</h4 >
                        {
                            collections.length < 1 ? <h5 className="text-center mt-3" style={{color: 'grey'}}>Check the save collection button to save your questions here.</h5> :
                            collections.map((collection) => <Collection addCollection={(data) => addQuestionsColl(data)} key={collection._id} data={collection}/>)
                        }
                    </div>
                </Col>
                <Col xs="7" className="ml-4">
                    <div>
                        <Form className="questionForm">
                            <FormGroup className="d-flex flex-column">
                                <Label className="align-self-center">Question</Label> 
                                <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Input question here.." />
                            </FormGroup>
                            <FormGroup className="d-flex flex-column">
                                <Col xs="12" className="d-flex">
                                    <Label className="align-self-center mr-3">Point</Label> 
                                    <Input style={{width: '200px'}} value={pointQuestion} onChange={(e) => setPointQuestion(e.target.value)} type="number" placeholder="Range 0 - 100" min="0"/>
                                    <small className="smallText align-self-center ml-3">Please fill range between 0 - 100</small>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <small className="smallText ">Please check the correct answer!</small>
                                <Row>
                                    <Col xs="6" className="mt-2 d-flex">
                                        <Input onChange={(e) => handleChange1(e)} name="status" type="checkbox" checked={answer1.status} />{' '}
                                        <Input className="ml-1" value={answer1.answer} onChange={(e) => handleChange1(e)} name="answer" type="text" placeholder="Input answer here.." />
                                    </Col>
                                    <Col xs="6" className="mt-2 d-flex">
                                        <Input name="status" onChange={(e) => handleChange2(e)} type="checkbox" checked={answer2.status} />{' '}
                                        <Input className="ml-1" value={answer2.answer} onChange={(e) => handleChange2(e)} name="answer" type="text" placeholder="Input answer here.." />
                                    </Col>
                                    <Col xs="6" className="mt-2 d-flex">
                                        <Input checked={answer3.status} onChange={(e) => handleChange3(e)} name="status" type="checkbox" />{' '}
                                        <Input className="ml-1" value={answer3.answer} onChange={(e) => handleChange3(e)} name="answer" type="text" placeholder="Input answer here.." />
                                    </Col>
                                    <Col xs="6" className="mt-2 d-flex">
                                        <Input checked={answer4.status} onChange={(e) => handleChange4(e)} name="status" type="checkbox" />{' '}
                                        <Input className="ml-1" value={answer4.answer} onChange={(e) => handleChange4(e)} name="answer" type="text" placeholder="Input answer here.." />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <Button style={{fontWeight: 'bold', background: '#ee6f57', color: 'white', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}} block onClick={() => handleClick()}>Add Question</Button>
                        </Form>
                        <Form className="quizForm d-flex justify-content-center">
                            <Col xs="5" className="mt-4 d-flex flex-column align-items-center">
                                <Label className="align-self-center mr-3 tex">Time Limit</Label> 
                                <Input value={timer} onChange={(e) => setTimer(e.target.value)} type="number" placeholder="time in seconds" min="0"/>
                                <small className="smallText mt-2">Please fill timer in seconds</small>
                                <Label className="px-4 mt-3">Quiz Title</Label>
                                <Input onChange={(e) => setTitleQuiz(e.target.value)} type="text" placeholder="Math for Beginners.."/> 
                                <Label check className="mt-2">
                                    <small> <Input checked={saveCollection} onChange={(e) => setSaveCollection(e.target.checked)} name="collection" type="checkbox" />{' '}Save questions to collection</small>
                                </Label>
                                <Button onClick={() => handleGame()} className="my-4" style={{fontWeight: 'bold', background: '#ee6f57', color: 'white', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>Create Quiz</Button>  
                            </Col>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default CreateQuiz