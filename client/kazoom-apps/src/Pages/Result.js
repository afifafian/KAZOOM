import React from 'react';
import { Container, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { playerPoints, questionsData } from '../config/makeVar';
import { DELETE_ALL_QUESTION, FETCH_QUESTIONS } from '../config/queries';
import { useMutation } from '@apollo/client';

const Result = () => {
    const history = useHistory()
    const [deleteMany] = useMutation(DELETE_ALL_QUESTION, {
        refetchQueries: [{
            query: FETCH_QUESTIONS
        }],
        onCompleted: () => {
            questionsData([])
            playerPoints([])
            history.push(`/`)
        }
    })

    const handleHome = () => {
        localStorage.clear()
        deleteMany()
    }

        return (
            <div className="d-flex flex-column align-items-center">
                <Container className="mt-5">
                    <h3 className="text-center">Result</h3>
                        <div className="text-center">
                            <h1>Congratulation {localStorage.player}!</h1>
                            <h3>Your result is...</h3>
                            <h2>{localStorage.point}</h2>
                        </div>
                </Container>
                <Button onClick={() => handleHome()}>Home</Button>
            </div>
        )
}

export default Result

