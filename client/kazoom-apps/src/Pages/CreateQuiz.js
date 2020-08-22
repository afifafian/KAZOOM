import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { QuestionCard } from '../Components';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { FETCH_QUESTIONS, ADD_QUESTION } from '../config/queries';
import { gameId, quizTitle, addTimer, questionsData } from '../config/makeVar';
import { v4 as uuidv4 } from 'uuid';


const CreateQuiz = () => {
    const history = useHistory()
    const {loading:loadQuestion, error:errQuestion, data:questionRes} = useQuery(FETCH_QUESTIONS)
    const [addQuestion] = useMutation(ADD_QUESTION, {
        refetchQueries: [{
            query: FETCH_QUESTIONS
        }],
        onCompleted: () => alert(`Add new question!`)
    })

    const [title, setTitle] = useState('')
    const [titleQuiz, setTitleQuiz] = useState('')
    const [timer, setTimer] = useState(0)
    const [saveCollection, setSaveCollection] = useState(false) 
    const [pointQuestion, setPointQuestion] = useState(0)
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
    const handleGame = () => {
        // let collection = {
        //     id: idColl,
        //     title: titleQuiz,
        //     questions,
        // }
        // if (saveCollection) {
        //     dispatch(addCollection(collection))
        // }
        const idPlay = uuidv4()
        gameId(idPlay)
        quizTitle(titleQuiz)
        addTimer(Number(timer))
        questionsData(questionRes.questions)
        history.push(`/room`)
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
        <>
            <Row>
                <Col xs="4" className="px-5 mt-5">
                    <div style={{maxHeight: '300px', overflow: 'auto'}}>
                        <h4 className="text-center">List Questions</h4>
                        {
                            loadQuestion ? <h2>Loading..</h2> : errQuestion ? <h2>Error 404</h2> :
                            questionRes.questions.map((question) => <QuestionCard key={question._id} data={question}/>)
                        }
                    </div>
                    <div className="mt-3" style={{maxHeight: '200px', overflow: 'auto'}}>
                        <h4 className="text-center">Collection</h4 >
                        {/* {
                            collections.map((collection) => <Collection key={collection.id} data={collection}/>)
                        } */}
                    </div>
                </Col>
                <Col xs="8">
                    <div className="px-5 mt-5">
                        <Form>
                            <FormGroup className="d-flex flex-column">
                                <Label className="align-self-center">Question</Label> 
                                <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="mengapa bulan.." />
                            </FormGroup>
                            <FormGroup className="d-flex flex-column">
                                <Col xs="6" className="ml-3 d-flex justify-content-around">
                                    <Label className="align-self-center mr-3">Point</Label> 
                                    <Input value={pointQuestion} onChange={(e) => setPointQuestion(e.target.value)} type="number" placeholder="Range 0 - 100" min="0"/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <small>Please check the correct answer!</small>
                                <Row>
                                    <Col xs="6" className="mt-2 d-flex">
                                        <Input onChange={(e) => handleChange1(e)} name="status" type="checkbox" checked={answer1.status} />{' '}
                                        <Input className="ml-1" value={answer1.answer} onChange={(e) => handleChange1(e)} name="answer" type="text" placeholder="mengapa bulan.." />
                                    </Col>
                                    <Col xs="6" className="mt-2 d-flex">
                                        <Input name="status" onChange={(e) => handleChange2(e)} type="checkbox" checked={answer2.status} />{' '}
                                        <Input className="ml-1" value={answer2.answer} onChange={(e) => handleChange2(e)} name="answer" type="text" placeholder="mengapa bulan.." />
                                    </Col>
                                    <Col xs="6" className="mt-2 d-flex">
                                        <Input checked={answer3.status} onChange={(e) => handleChange3(e)} name="status" type="checkbox" />{' '}
                                        <Input className="ml-1" value={answer3.answer} onChange={(e) => handleChange3(e)} name="answer" type="text" placeholder="mengapa bulan.." />
                                    </Col>
                                    <Col xs="6" className="mt-2 d-flex">
                                        <Input checked={answer4.status} onChange={(e) => handleChange4(e)} name="status" type="checkbox" />{' '}
                                        <Input className="ml-1" value={answer4.answer} onChange={(e) => handleChange4(e)} name="answer" type="text" placeholder="mengapa bulan.." />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <Button block onClick={() => handleClick()}>Add Question</Button>
                        </Form>
                        <Form className="d-flex justify-content-center">
                            <Col xs="5" className="mt-5 d-flex flex-column align-items-center">
                                <Label className="align-self-center mr-3 tex">Time Limit</Label> 
                                <Input value={timer} onChange={(e) => setTimer(e.target.value)} type="number" placeholder="time in seconds" min="0"/>
                                <Label className="px-4 mt-3">Quiz Title</Label>
                                <Input onChange={(e) => setTitleQuiz(e.target.value)} type="text" placeholder="apaya.."/> 
                                <Label check className="mt-2">
                                    <small> <Input checked={saveCollection} onChange={(e) => setSaveCollection(e.target.checked)} name="collection" type="checkbox" />{' '}Save questions to collection</small>
                                </Label>
                                <Button onClick={() => handleGame()} className="my-3">Create Quiz</Button>  
                            </Col>
                        </Form>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default CreateQuiz