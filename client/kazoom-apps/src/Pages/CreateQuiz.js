import React, { useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { QuestionCard, Collection } from '../Components';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addQuestion, addCollection, setGameId } from '../Store/action';
import { v4 as uuidv4 } from 'uuid';


const CreateQuiz = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { questions, collections } = useSelector((state) => state)
    const [title, setTitle] = useState('')
    const [titleQuiz, setTitleQuiz] = useState('')
    const [saveCollection, setSaveCollection] = useState(false) 
    const [point, setPoint] = useState(0)
    const [idTemp, setIdTemp] = useState(1)
    const [idColl, setIdColl] = useState(1)
    const [answer1, setAnswer1] = useState({
        message: '',
        status: false,
    })
    const [answer2, setAnswer2] = useState({
        message: '',
        status: false,
    })
    const [answer3, setAnswer3] = useState({
        message: '',
        status: false,
    })
    const [answer4, setAnswer4] = useState({
        message: '',
        status: false,
    })
    const handleGame = () => {
        // console.log(saveCollection)
        // console.log(questions)
        let collection = {
            id: idColl,
            title: titleQuiz,
            questions,
        }
        // console.log(collection)
        if (saveCollection) {
            dispatch(addCollection(collection))
        }
        const gameId = uuidv4()
        setIdColl(idColl+1)
        dispatch(setGameId(gameId))
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
            id: idTemp,
            title,
            point,
            choices: [
                answer1, answer2, answer3, answer4
            ]
        }
        // console.log(newQuestion)
        dispatch(addQuestion(newQuestion))
        setIdTemp(idTemp+1)
    }
    return (
        <>
            <Row>
                <Col xs="4" className="px-5 mt-5">
                    <div style={{maxHeight: '300px', overflow: 'auto'}}>
                        <h4 className="text-center">List Questions</h4>
                        {
                            questions.map((question, index) => <QuestionCard key={index} data={question} index={index}/>)
                        }
                    </div>
                    <div className="mt-3" style={{maxHeight: '200px', overflow: 'auto'}}>
                        <h4 className="text-center">Collection</h4 >
                        {
                            collections.map((collection) => <Collection key={collection.id} data={collection}/>)
                        }
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
                                <Col xs="4" className="d-flex">
                                    <Label className="align-self-center mr-3">Point</Label> 
                                    <Input value={point} onChange={(e) => setPoint(e.target.value)} type="number" placeholder="Range 0 - 100" min="0"/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs="6" className="mt-2 d-flex">
                                        <Input onChange={(e) => handleChange1(e)} name="status" type="checkbox" checked={answer1.status} />{' '}
                                        <Input className="ml-1" value={answer1.message} onChange={(e) => handleChange1(e)} name="message" type="text" placeholder="mengapa bulan.." />
                                    </Col>
                                    <Col xs="6" className="mt-2 d-flex">
                                        <Input name="status" onChange={(e) => handleChange2(e)} type="checkbox" checked={answer2.status} />{' '}
                                        <Input className="ml-1" value={answer2.message} onChange={(e) => handleChange2(e)} name="message" type="text" placeholder="mengapa bulan.." />
                                    </Col>
                                    <Col xs="6" className="mt-2 d-flex">
                                        <Input checked={answer3.status} onChange={(e) => handleChange3(e)} name="status" type="checkbox" />{' '}
                                        <Input className="ml-1" value={answer3.message} onChange={(e) => handleChange3(e)} name="message" type="text" placeholder="mengapa bulan.." />
                                    </Col>
                                    <Col xs="6" className="mt-2 d-flex">
                                        <Input checked={answer4.status} onChange={(e) => handleChange4(e)} name="status" type="checkbox" />{' '}
                                        <Input className="ml-1" value={answer4.message} onChange={(e) => handleChange4(e)} name="message" type="text" placeholder="mengapa bulan.." />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <Button block onClick={() => handleClick()}>Add Question</Button>
                        </Form>
                        <Form className="d-flex justify-content-center">
                            <Col xs="5" className="mt-5 d-flex flex-column align-items-center">
                                <Label className="px-4">Quiz Title</Label>
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