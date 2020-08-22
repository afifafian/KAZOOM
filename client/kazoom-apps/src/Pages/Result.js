import React from 'react';
import { Table, Container, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { playerPoint, questionsData } from '../config/makeVar';
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
            playerPoint(0)
            history.push(`/`)
        }
    })
    const handleHome = () => {
        deleteMany()
    }
    return (
        <div className="d-flex flex-column align-items-center">
            <Container className="mt-5">
                <h3 className="text-center">Result</h3>
                <Table>
                    <thead>
                        <tr>
                        <th>User</th>
                        <th>Final Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>Mahmud</td>
                        <td>{playerPoint()}</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
            <Button onClick={() => handleHome()}>Home</Button>
        </div>
    )
}

export default Result

