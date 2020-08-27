import React from 'react';
import { Container } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { playerPoints, questionsData } from '../config/makeVar';
import { DELETE_ALL_QUESTION, FETCH_QUESTIONS } from '../config/queries';
import { useMutation } from '@apollo/client';
import useSound from 'use-sound';
import clickSound from '../assets/sounds/click_button.mp3';

const Result = () => {
    const history = useHistory()
    const [playButton] = useSound(clickSound)
    const [deleteMany] = useMutation(DELETE_ALL_QUESTION, {
        refetchQueries: [{
            query: FETCH_QUESTIONS
        }],
        onCompleted: () => {
            localStorage.clear()
            questionsData([])
            playerPoints([])
            history.push({
                pathname: `/`,
                state: 'result'
            })
        }
    })

    const handleHome = () => {
        playButton()
        deleteMany()
    }
        return (
            <div className="d-flex flex-column align-items-center mx-5">
                <Container className="tableResult" style={{marginTop: '150px', minHeight: '300px'}}>
                        <div className="text-center text-light mt-5">
                            <h1>Congratulation {localStorage.player}!</h1>
                            <h3>Your result is..</h3>
                            <h2>{localStorage.point}</h2>
                        </div>
                </Container>
                <button type="button" className="buttonLogin mt-5" onClick={() => handleHome()}>Home</button>
            </div>
        )
}

export default Result

